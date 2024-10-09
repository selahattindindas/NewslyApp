import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { NewsList } from '../../../../shared/models/news/list-news';

@Component({
  selector: 'app-news-container',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.scss'
})
export class NewsContainerComponent implements OnChanges, OnInit {
  @Input() news: NewsList[] = []; 
  leftSide: NewsList[] = []; 
  rightSide: NewsList[] = []
  isMobile: boolean = false; 
  
  constructor(){}

  ngOnInit(): void {
    this.checkScreenSize();
  }

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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize(); 
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }
  }
}
