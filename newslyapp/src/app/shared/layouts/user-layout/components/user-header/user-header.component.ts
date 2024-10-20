import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SearchComponent } from "../../../../components/search/search.component";
import { LocationComponent } from "../../../../components/location/location.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-header',
  standalone: true,
  imports: [SearchComponent, LocationComponent, CommonModule, RouterLink],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent implements OnInit{
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

  onToggleSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.toggleSidebar.emit(); 
  }
}
