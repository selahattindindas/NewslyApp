import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormEditorComponent } from "../../../../shared/components/form-editor/form-editor.component";
import { AddNews } from '../../../../shared/models/news/add-news';
import { NewsService } from '../../../news.service';

@Component({
  selector: 'app-news-create',
  standalone: true,
  imports: [CommonModule, FormEditorComponent],
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit(): void { 
  }

  onSubmit(formData: AddNews){
    this.newsService.addNews(formData);
  }
}
