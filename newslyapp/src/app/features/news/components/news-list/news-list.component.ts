import { Component } from '@angular/core';
import { NewsService } from '../../news.service';
import { CommonModule } from '@angular/common';
import { News, NewsList } from '../news-create/news-create.component';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { NewsContainerComponent } from '../news-container/news-container.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { PopularNewsComponent } from '../../../popular-news/popular-news.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, SliderComponent, NewsContainerComponent, FooterComponent, PopularNewsComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  news: NewsList[] = [];
  categoryName!: string;

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName') as string;
      this.fetchCategoryAndNews(); 
    });
  }
  
  fetchCategoryAndNews() {
    this.newsService.getNewsByCategory(this.categoryName).subscribe({
      next: ({ category, newsList }) => {
        this.categoryName = category.slug;
        this.news = newsList;
      },
      error: () => {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
