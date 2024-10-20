import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnInit{
  isDarkTheme = false;
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getStoredTheme() === 'dark';
  }

  toggleTheme() {
    const newTheme = this.isDarkTheme ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
    this.isDarkTheme = !this.isDarkTheme;
  }
}
