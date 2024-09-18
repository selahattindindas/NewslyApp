import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, CardComponent, TruncatePipe],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit, OnDestroy {
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
  
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
  slider: KeenSliderInstance | undefined;
  pages: number[] = [];
  currentSlide: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        loop: true,
        drag: false,
        breakpoints: {
          "(min-width: 400px)": {
            slides: { perView: 2, spacing: 5 },
          },
          "(min-width: 1000px)": {
            slides: { perView: 3, spacing: 10 },
          },
        },
        slides: { perView: 1 },
      });
      this.slider.on("slideChanged", (slider) => {
        this.currentSlide = slider.track.details.rel;
      });
    }
  }

  ngOnDestroy(): void {
    this.slider?.destroy();
  }
}
