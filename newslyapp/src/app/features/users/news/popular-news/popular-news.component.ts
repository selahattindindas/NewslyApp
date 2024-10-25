import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input  } from '@angular/core';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { Router, RouterLink } from '@angular/router';
import { StringHelper } from '../../../../shared/utils/string-helper';
import { NewsList } from '../../../../shared/models/news/list-news';

@Component({
  selector: 'app-popular-news',
  standalone: true,
  imports: [TruncatePipe, RouterLink],
  templateUrl: './popular-news.component.html',
  styleUrl: './popular-news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularNewsComponent {
  @Input() news: NewsList[] = [];

  constructor(private router: Router){}
  
  ngOnChanges() {
    this.news = this.getRandomNews(this.news, 5);
  }

  getRandomNews(newsArray: NewsList[], count: number): NewsList[] {
    const shuffled = [...newsArray].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  navigateToCategory(news: NewsList) {
    const categorySlug = StringHelper.convertToSlug(news.categoryName);
    const newsSlug = StringHelper.convertToSlug(news.title, news.id);
    this.router.navigate([`${categorySlug}/${newsSlug}`]);
  }
}
