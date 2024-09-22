import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule, QuillModules } from 'ngx-quill';
import Quill from 'quill';
import { NewsService } from '../../news.service';

export interface News {
  title : string,
  content : string,
  categoryId: number,
}

export interface Category {
  id : number,
  name: string,
  urlFriendlyName: string
}

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
  selector: 'app-news-create',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit {
  quillModules = quillModules;
  categories!: Category[];
  editorInstance!: Quill;
  news: News = {
    title: '',
    content: '',
    categoryId: 0 
  };

  constructor(private newsService: NewsService) { }

  ngOnInit(): void { 
    this.getCategory();
  }

  getCategory(){
    this.newsService.getCategories().subscribe((response) =>{
      this.categories = response;
    })
  }

  onSubmit() {
    this.news.content = this.removeEmptyParagraphs(this.news.content);
    this.newsService.addNews(this.news).subscribe(() => {
      this.news = {
        title: this.news.title,
        content: this.news.content,
        categoryId: this.news.categoryId,
      };
    });
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
