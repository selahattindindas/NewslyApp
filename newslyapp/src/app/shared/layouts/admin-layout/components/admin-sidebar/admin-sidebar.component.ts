import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from "../../../../components/search/search.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchComponent, CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  @Output() closeSideNav = new EventEmitter<void>();
  @Input() isSidebarOpen: boolean = false;
  
  onClose() {
    this.closeSideNav.emit();
  }

}
