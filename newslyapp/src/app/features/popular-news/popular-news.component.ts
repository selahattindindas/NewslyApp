import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { NewsList } from '../news/components/news-create/news-create.component';
import { Router, RouterLink } from '@angular/router';
import { StringHelper } from '../../shared/utils/string-helper';

@Component({
  selector: 'app-popular-news',
  standalone: true,
  imports: [CommonModule, TruncatePipe, RouterLink],
  templateUrl: './popular-news.component.html',
  styleUrl: './popular-news.component.scss'
})
export class PopularNewsComponent {
  @Input() news: NewsList[] = [];

  constructor(private router: Router){}
  
  navigateToCategory(news: NewsList) {
    const categorySlug = StringHelper.convertToSlug(news.categoryName);
    const newsSlug = StringHelper.convertToSlug(news.title, news.id);
    this.router.navigate([`${categorySlug}/${newsSlug}`]);
  }
}
