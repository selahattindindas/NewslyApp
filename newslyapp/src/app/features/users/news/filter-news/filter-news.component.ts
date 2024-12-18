import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../../core/services/news.service';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { NewsContainerComponent } from '../news-container/news-container.component';
import { PopularNewsComponent } from '../popular-news/popular-news.component';
import { NewsList } from '../../../../shared/models/news/list-news';

@Component({
  selector: 'app-filter-news',
  standalone: true,
  imports: [NewsContainerComponent, PopularNewsComponent, SearchComponent],
  templateUrl: './filter-news.component.html',
  styleUrl: './filter-news.component.scss'
})
export class FilterNewsComponent implements OnInit {
  filteredNews: NewsList[] = [];
  searchTerm: string = '';
  news: NewsList[] = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['title'] || '';

      if (params['search'] && !this.searchTerm) {
        this.filteredNews = [];
      } else {
        this.filterNews(this.searchTerm);
      }
    });
    this.getPopularNews();
  }

  filterNews(searchTerm: string) {
    this.newsService.getNews().then((data) => {
      if (!searchTerm) {
        this.filteredNews = [];
      } else {
        this.filteredNews = data.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
  }

  getPopularNews(): void {
    this.newsService.getNews().then((data: NewsList[]) => {
      this.news = this.getRandomItems(data, 6);
    });
  }

  getRandomItems(arr: NewsList[], count: number): NewsList[] {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
