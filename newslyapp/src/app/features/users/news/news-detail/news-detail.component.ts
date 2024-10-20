import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { StringHelper } from '../../../../shared/utils/string-helper';
import { MoreNewsComponent } from '../more-news/more-news.component';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { NewsService } from '../../../../core/services/news.service';
import { NewsList } from '../../../../shared/models/news/list-news';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink, MoreNewsComponent, TimeAgoPipe],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  news?: NewsList;
  newsId!: number;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('titleSlugAndId');
    
      if (slug) {
        const parts = slug.split('-p-');
        if (parts.length < 2 || isNaN(Number(parts[1]))) {
          this.router.navigate(['/not-found']);
          return;
        }
  
        this.newsId = Number(parts[1]);
      } else {

        this.router.navigate(['/not-found']);
        return;
      }
  
      if (isPlatformBrowser(this.platformId)) {
        this.getNews();
      }
    });
  }

  getNews(): void {
    this.spinnerService.setLoading(true);
    this.news = undefined;
    this.newsService.getNewsById(this.newsId).then(response => {
        this.news = response;
        this.setTitle(this.news.title);
    })
    .catch(() => {
      this.router.navigate(['/not-found']);
    })
    .finally(() => {
      this.spinnerService.setLoading(false);
    });
  };
  

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  getFormattedCategory(): string {
    if (this.news && this.news.categoryName) {
      return StringHelper.convertSlugToCategoryName(this.news.categoryName);
    }
    return '';
  }

  navigateToCategory() {
    const categorySlug = StringHelper.convertToSlug(this.news?.categoryName || '');
    this.router.navigate([`${categorySlug}`]);
  }
}
