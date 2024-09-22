import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { Test } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-popular-news',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './popular-news.component.html',
  styleUrl: './popular-news.component.scss'
})
export class PopularNewsComponent {
  @Input() news: Test[] = [];
}
