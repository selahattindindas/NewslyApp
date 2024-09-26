import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../news.service';
import { isPlatformBrowser } from '@angular/common';
import { News, NewsList } from '../news-create/news-create.component';
import { StringHelper } from '../../../../shared/utils/string-helper';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  title!: string; 
  news!: NewsList;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); 
      const titleParam = params.get('title'); 
      this.title = titleParam ? titleParam : ''; 

      if (isPlatformBrowser(this.platformId)) {
        document.title = this.title; 
      }

      if (idParam) {
        this.getNewsById(Number(idParam));
      }
    });
  }

  getNewsById(id: number): void {
    this.newsService.getNewsById(id).subscribe(
      data => {
        if (data.title === this.title) {
          this.news = data;
        } else {
          this.router.navigate(['/not-found']);
        }
      },
     
    );
  }

  getFormattedCategory(): string {
    if (this.news && this.news.categoryName) {
      return StringHelper.convertToSlug(this.news.categoryName);
    }
    return '';
  }
}
