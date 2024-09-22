import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, SimpleChanges, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Test } from '../card/card.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
  slider: KeenSliderInstance | undefined;
  currentSlide: number = 0;
  @Input() news: Test[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.initializeSlider();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['news']) {
      this.updateSlider(); 
    }
  }

  initializeSlider(): void {
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
      this.cdref.detectChanges(); 
    }
  }

  updateSlider(): void {
    this.slider?.destroy();
    this.initializeSlider(); 
  }
  

  ngOnDestroy(): void {
    this.slider?.destroy();
  }
}
