
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';
  private platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(this.getStoredTheme());
    }
  }

  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.themeKey, theme);
      this.applyTheme(theme);
    }
  }

  getStoredTheme(): 'light' | 'dark' {
    if (isPlatformBrowser(this.platformId)) {
      return (localStorage.getItem(this.themeKey) as 'light' | 'dark') || 'light';
    }
    return 'light'; 
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }
}
