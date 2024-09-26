import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
import { NewsList } from '../../../features/news/components/news-create/news-create.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent implements OnChanges {
  @Input() news: NewsList[] = []; 
  leftSlides: NewsList[] = [];
  rightSlides: NewsList[] = [];

  constructor(){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['news']) {
      this.updateSlides(); 
    }
  }

  updateSlides() {
    setTimeout(() => {
      const midIndex = Math.ceil(this.news.length / 2);
      this.leftSlides = this.news.slice(0, midIndex);
      this.rightSlides = this.news.slice(midIndex);
    }, 300); 
  }
}
