import { Component } from '@angular/core';
import { NewsService } from '../../news.service';
import { CommonModule } from '@angular/common';
import { News } from '../news-create/news-create.component';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  news!: News[];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((data) =>{
      this.news = data
    }) 
  }
  
}
