import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../news.service';
import { isPlatformBrowser } from '@angular/common';
import { News, NewsList } from '../news-create/news-create.component';
import { StringHelper } from '../../../../shared/utils/string-helper';
import { MoreNewsComponent } from '../more-news/more-news.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink, MoreNewsComponent],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  news!: NewsList;
  slug!: string;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('title') as string; 
      if (isPlatformBrowser(this.platformId)) {
        this.getNews();
      }
    });
  }

  getNews(): void { 
    this.newsService.getNewsBySlug(this.slug).subscribe({
      next: (data: NewsList) => {
        this.news = data;
        this.setTitle(this.news.title);
      },
      error: () => {
        this.router.navigate(['/not-found']);
      }
    });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title); 
  }

  getFormattedCategory(): string {
    if (this.news && this.news.categoryName) {
      return StringHelper.convertToSlug(this.news.categoryName);
    }
    return '';
  }
}
