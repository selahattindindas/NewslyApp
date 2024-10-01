import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { LocationComponent } from "../location/location.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, LocationComponent, CommonModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isDesktop: boolean = true; 
  @Output() toggleSidebar = new EventEmitter<void>();  

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth > 500;
    }
  }

  openSidenav() {
    this.toggleSidebar.emit();
 }
}
