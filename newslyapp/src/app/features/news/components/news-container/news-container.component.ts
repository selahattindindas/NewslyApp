import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NewsList } from '../news-create/news-create.component';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-news-container',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.scss'
})
export class NewsContainerComponent implements OnChanges {
  @Input() news: NewsList[] = []; 
  leftSide: NewsList[] = []; 
  rightSide: NewsList[] = []

  constructor(){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['news']) {
      this.updateSlides(); 
    }
  }

  updateSlides() {
    setTimeout(() => {
      const midIndex = Math.ceil(this.news.length / 2);
      this.leftSide = this.news.slice(0, midIndex);
      this.rightSide = this.news.slice(midIndex);
    }, 300); 
  }
}
