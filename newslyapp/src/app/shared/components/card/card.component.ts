import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Router, RouterLink } from '@angular/router';
import { StringHelper } from '../../utils/string-helper';
import { NewsList } from '../../models/news/list-news';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent implements OnChanges {
  @Input() news: NewsList[] = [];
  @Input() width: string = '90%';
  isMobile: boolean = false; 

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['news']) {
    }
  }

  navigateToCategory(news: NewsList) {
    const categorySlug = StringHelper.convertToSlug(news.categoryName);
    const newsSlug = StringHelper.convertToSlug(news.title, news.id);
    this.router.navigate([`${categorySlug}/${newsSlug}`]);
  }
}