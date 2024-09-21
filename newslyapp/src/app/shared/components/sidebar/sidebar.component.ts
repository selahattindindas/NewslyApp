import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  categories: { name: string }[] = [
    { name: 'Gündem'},
    { name: 'Bilim & Teknoloji'},
    { name: 'Finans'},
    { name: 'Yaşam'},
    { name: 'Spor'},
  ];
}
