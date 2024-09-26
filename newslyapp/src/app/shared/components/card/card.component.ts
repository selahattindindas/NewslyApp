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

  constructor(){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['news']) {
    }
  }


}
