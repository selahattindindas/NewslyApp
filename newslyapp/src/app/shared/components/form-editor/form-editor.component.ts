import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ListCategory } from '../../models/categories/list-category';
import Quill from 'quill';
import { NewsList } from '../../models/news/list-news';
import { quillModules, ToolbarModule } from './form-editor.module';
import { CategoryService } from '../../../core/services/category.service';


@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule],
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditorComponent<T> implements OnInit, OnChanges {
  @Input() btnTitle = '';
  @Input() news!: NewsList;
  @Output() itemSubmit = new EventEmitter<T>();

  formGroup!: FormGroup;
  quillModules = quillModules;
  categories: ListCategory[] = [];
  editorInstance!: Quill;
  isEditMode: boolean = false;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      categoryName: new FormControl(""),
      content: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
      date: new FormControl(null),
      auth: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['news'] && this.news) {
      this.isEditMode = true;
      setTimeout(() => {
        this.getValue();
      }, 500);
    }
  }

  getCategory() {
    this.categoryService.getCategories().then((response) => {
      this.categories = response;
    })
  }

  getValue() {
    this.formGroup.patchValue({
      title: this.news.title || '',
      content: this.news.content || '',
      categoryName: this.news.categoryName,
    });
  }

  onSubmit() {
    if (!this.formGroup.valid)
      return;

    const formData = this.formGroup.value;

    const formattedData = {
      ...formData,
      image: this.extractImageFromContent(formData.image),
      content: this.removeEmptyParagraphs(formData.content),
      date : new Date(),
      author: 'Selahattin'
    }

    if (this.isEditMode) {
      formattedData.id = this.news.id;
    }

    this.itemSubmit.emit(formattedData);
  }

  extractImageFromContent(content: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const imgTag = tempDiv.querySelector('img');
    return imgTag ? imgTag.src : '';
  }

  removeEmptyParagraphs(content: string): string {
    return content.replace(/<p>\s*<\/p>/g, '');
  }

  onEditorCreated(editor: Quill): void {
    this.editorInstance = editor;

    editor.clipboard.addMatcher(Node.ELEMENT_NODE, this.handleClipboardDelta.bind(this));

    const toolbar = editor.getModule('toolbar') as ToolbarModule;
    toolbar.addHandler('image', this.imageHandler.bind(this));
  }

  private handleClipboardDelta(node: Node, delta: any) {
    delta.forEach((e: any) => {
      if (e && e.attributes) {
        this.cleanAttributes(e.attributes);
      }     
    });
    return delta;
  }

  private cleanAttributes(attributes: Record<string, unknown>) {
    delete attributes['color'];
    delete attributes['background'];
    delete attributes['fontSize'];
    delete attributes['fontWeight'];
  }

  imageHandler() {
    const url = prompt('Fotoğraf URL\'sini girin:');
    const range = this.editorInstance.getSelection();
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i;

    if (url && urlPattern.test(url)) {
      this.editorInstance!.insertEmbed(range!.index, 'image', url);
      this.news.content = this.editorInstance.root.innerHTML;
    }
  }
}
