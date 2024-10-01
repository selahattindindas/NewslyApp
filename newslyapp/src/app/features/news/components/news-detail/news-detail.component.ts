import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../news.service';
import { isPlatformBrowser } from '@angular/common';
import { NewsList } from '../news-create/news-create.component';
import { StringHelper } from '../../../../shared/utils/string-helper';
import { MoreNewsComponent } from '../more-news/more-news.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink, MoreNewsComponent,],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  news!: NewsList;
  newsId!: number;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('titleSlugAndId'); 
      if(slug){
        const parts = slug.split('-p-');
        this.newsId = parts.length > 1 ? Number(parts[1]) : 0;
      }
      if (isPlatformBrowser(this.platformId)) {
        this.getNews();
      }
    });
  }

  getNews(): void { 
    this.newsService.getNewsById(this.newsId).subscribe({
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
      return StringHelper.convertSlugToCategoryName(this.news.categoryName);
    }
    return '';
  }

  navigateToCategory() {
    const categorySlug = StringHelper.convertToSlug(this.news.categoryName);
    this.router.navigate([`${categorySlug}`]);
  }
}
