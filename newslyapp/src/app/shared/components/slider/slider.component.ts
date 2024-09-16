import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
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
  @ViewChild('sliderContainer', { static: false }) sliderContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {

  }

  scrollNext() {
    const slider = this.sliderContainer.nativeElement;
    const scrollAmount = slider.offsetWidth;
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  scrollPrev() {
    const slider = this.sliderContainer.nativeElement;
    const scrollAmount = slider.offsetWidth;
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
}
