import { Component } from '@angular/core';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { NewsContainerComponent } from '../news-container/news-container.component';
import { PopularNewsComponent } from '../popular-news/popular-news.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StringHelper } from '../../../../shared/utils/string-helper';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { NewsService } from '../../../../core/services/news.service';
import { NewsList } from '../../../../shared/models/news/list-news';
import { UserFooterComponent } from '../../../../shared/layouts/user-layout/components/user-footer/user-footer.component';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [SliderComponent, NewsContainerComponent, UserFooterComponent, PopularNewsComponent],
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
  ) { }

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
    this.newsService.getNewsByCategoryName(this.categoryName).then(response => {
      if (response.length === 0) {
        this.router.navigate(['/not-found']);
      } else {
        this.news = response;
        this.setTitle(this.categoryName + ' Haberleri & Son Dakika Haberleri - Newsly');
      }
    })
    .catch(() => {
      this.router.navigate(['/not-found']);
    })
    .finally(() => {
      this.spinnerService.setLoading(false);
    });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
