import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  slides: { image: string, author: string, date: string, description: string }[] = [
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'fıçı içinde ölü bulundu:' },
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi ' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi' },
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
  ];

  leftSlides : any[] = [];
  rightSlides : any[] = [];

  ngOnInit(): void {
    const midIndex = Math.ceil(this.slides.length / 2);
    this.leftSlides = this.slides.slice(0, midIndex); 
    this.rightSlides = this.slides.slice(midIndex);
  }
}
