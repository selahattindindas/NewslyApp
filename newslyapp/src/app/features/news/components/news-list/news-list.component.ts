import { Component } from '@angular/core';
import { NewsService } from '../../news.service';
import { CommonModule } from '@angular/common';
import { News, NewsList } from '../news-create/news-create.component';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { NewsContainerComponent } from '../news-container/news-container.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { PopularNewsComponent } from '../../../popular-news/popular-news.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StringHelper } from '../../../../shared/utils/string-helper';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from '../../../../shared/services/spinner.service';

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

  constructor(
    private newsService: NewsService, 
    private router: Router,
    private route: ActivatedRoute, 
    private titleService: Title,
    private spinnerService: SpinnerService 
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const slug = params.get('nameSlug') as string;
      this.categoryName = StringHelper.convertSlugToCategoryName(slug);
      this.fetchCategoryAndNews(); 
    });
  }
  
  fetchCategoryAndNews() {
    this.spinnerService.setLoading(true);
    this.news = [];
    this.newsService.getNewsByCategoryName(this.categoryName).subscribe({
      next: (response) => {
        this.news = response;
        this.setTitle(this.categoryName + ' Haberleri & Son Dakika Haberleri - Newsly');
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
      complete: () => {
        this.spinnerService.setLoading(false); 
      }
    });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title); 
  }
}
