import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';


export interface Test{
  id:number,
  image: string,
  author: string,
  date: string,
  description: string,
  categoryId: number
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent implements OnChanges {
  @Input() news: Test[] = []; 
  leftSlides: Test[] = [];
  rightSlides: Test[] = [];

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
