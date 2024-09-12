import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnInit{

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

 ngOnInit() {

  }

  setTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      this.renderer.addClass(this.el.nativeElement, 'dark-theme');
      this.renderer.removeClass(this.el.nativeElement, 'light-theme');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'light-theme');
      this.renderer.removeClass(this.el.nativeElement, 'dark-theme');
    }
  }
}
