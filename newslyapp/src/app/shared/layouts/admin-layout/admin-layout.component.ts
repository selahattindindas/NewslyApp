import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AdminSidebarComponent } from "./components/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminSidebarComponent, RouterOutlet, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  @ViewChild('sidenav', { static: true }) sidenav!: ElementRef<HTMLDivElement>; 

  isSidebarOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isSidebarOpen && !this.sidenav.nativeElement.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(event: KeyboardEvent) {
    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
  }
}
