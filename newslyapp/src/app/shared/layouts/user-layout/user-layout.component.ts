import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { UserFooterComponent } from "./components/user-footer/user-footer.component";
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from './components/user-header/user-header.component';

@Component({
  selector: 'user-layout',
  standalone: true,
  imports: [UserSidebarComponent, UserHeaderComponent, RouterOutlet, UserFooterComponent, CommonModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {
  @ViewChild('sidenav', { static: true }) sidenav!: ElementRef<HTMLDivElement>; 

  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
  }
}
