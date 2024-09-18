import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  slides: { image: string, author: string, date: string, description: string }[] = [
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:'},
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi ' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi' },
    { image: 'assets/img/test2.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi' },
    { image: 'assets/img/test.jpg', author: 'Selahattin', date: '15 saat', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu:' },
  ];
}
