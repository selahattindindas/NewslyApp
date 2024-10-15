import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { QuillModule, QuillModules } from 'ngx-quill';
import { DropdopwnComponent } from '../dropdopwn/dropdopwn.component';
import { ListCategory } from '../../models/categories/list-category';
import { CategoryService } from '../../../features/category.service';
import Quill from 'quill';
import { NewsList } from '../../models/news/list-news';

export const quillModules: QuillModules = {
  toolbar: [
    [{ 'header': '3' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image']
  ]
};

interface ToolbarModule {
  addHandler(name: string, handler: Function): void;
}
@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, DropdopwnComponent],
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent<T> implements OnInit, OnChanges {
  @Input() btnTitle = '';
  @Input() news: NewsList = {
    id: 0,
    title: '',
    categoryName: '',
    content: '',
    date: '',
    author: '',
    image: ''
  };
  @Output() itemSubmit = new EventEmitter<T>();
  @ViewChild('newsForm') newsForm!: NgForm;
  quillModules = quillModules;
  categories!: ListCategory[];
  editorInstance!: Quill;
  isEditMode: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void { 
    this.getCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['news'] && this.news) {
      this.isEditMode = true;
      this.getValue();
    }
  }

  getCategory(){
    this.categoryService.getCategories().then((response) =>{
      this.categories = response;
    })
  }

  onSubmit() {
    if (!this.newsForm.valid) 
      return;

    const formData = this.newsForm.value;

    const formattedData={
      ...formData,
      image : this.extractImageFromContent(this.news.content),
      content : this.removeEmptyParagraphs(this.news.content),
      author: 'Selahattin'
    }
    
    if (this.isEditMode) {
      formattedData.id = this.news.id; 
    }

    this.itemSubmit.emit(formattedData);
  }

  getValue() {
    if (!this.categories || this.categories.length === 0) 
      return; 

    const selectedPlatform = this.categories.find(category => category.name === this.news.categoryName);
    this.newsForm.form.patchValue({
      title: this.news.title || '',
      content: this.news.content || '',
      categoryName: selectedPlatform || '',
    });
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
    const toolbar = editor.getModule('toolbar') as ToolbarModule;
    toolbar.addHandler('image', this.imageHandler.bind(this)); 
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
