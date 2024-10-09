import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NewsService } from '../../../news.service';
import { NewsList } from '../../../../shared/models/news/list-news';

@Component({
  selector: 'app-more-news',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './more-news.component.html',
  styleUrl: './more-news.component.scss'
})
export class MoreNewsComponent implements OnInit {
  randomNews: NewsList[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    this.newsService.getNews().then((data: NewsList[]) => {
      this.randomNews = this.getRandomItems(data, 3);
    });
  }

  getRandomItems(arr: NewsList[], count: number): NewsList[] {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
