import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from "../../../shared/components/theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor() {};
  }

