import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule, QuillModules } from 'ngx-quill';
import Quill from 'quill';
import { NewsService } from '../../news.service';

export interface News {
  image: string,
  title : string,
  content : string,
  categoryId: number,
  author: string,
}

export interface NewsList{
  id: string, 
  image: string,
  title : string,
  date: string,
  content : string,
  categoryName: string,
  author: string,
}

export interface Category {
  id : number,
  name: string
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
    image: '',
    title: '',
    content: '',
    categoryId: 1,
    author: '',
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

  extractImageFromContent(content: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const imgTag = tempDiv.querySelector('img');
    return imgTag ? imgTag.src : '';
  }

  onSubmit() {
    this.news.image = this.extractImageFromContent(this.news.content);
    this.news.content = this.removeEmptyParagraphs(this.news.content);
    this.newsService.addNews(this.news).subscribe(() => {
      this.news = {
        image: this.news.image,
        title: this.news.title,
        content: this.news.content,
        categoryId: this.news.categoryId,
        author: 'Selahattin',
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
