import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminSidebarComponent } from "./components/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminSidebarComponent, RouterOutlet, AdminHeaderComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  @ViewChild('sidenav', { static: true }) sidenav!: ElementRef<HTMLDivElement>; 

  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
  }
}
