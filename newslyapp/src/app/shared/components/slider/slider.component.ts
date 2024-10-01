import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, SimpleChanges, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { NewsList } from '../../../features/news/components/news-create/news-create.component';
import { Router, RouterLink } from '@angular/router';
import { StringHelper } from '../../utils/string-helper';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TruncatePipe, RouterLink],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
  slider: KeenSliderInstance | undefined;
  currentSlide: number = 0;
  @Input() news: NewsList[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdref: ChangeDetectorRef, private router:Router) { }

  ngAfterViewInit(): void {
    this.initializeSlider();
  }

  ngOnDestroy(): void {
    this.slider?.destroy();
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
            slides: { perView: 1, spacing: 5},
            mode: "free-snap"
          },
          "(min-width: 500px)": {
            slides: { perView: 2, spacing: 0},
            mode: "free-snap"
          },
          "(min-width: 900px)": {
            slides: { perView: 3, spacing: 15},
            mode: "free-snap"
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
    setTimeout(() => {
      this.initializeSlider(); 
    }, 100);
  }
  
  navigateToCategory(news: NewsList) {
    const categorySlug = StringHelper.convertToSlug(news.categoryName);
    const newsSlug = StringHelper.convertToSlug(news.title, news.id);
    this.router.navigate([`${categorySlug}/${newsSlug}`]);
  }

  getFormattedCategories(): string {
    if (this.news.length > 0 && this.news[0].categoryName) { 
      return StringHelper.convertSlugToCategoryName(this.news[0].categoryName);
    }
    return '';
  }
}
