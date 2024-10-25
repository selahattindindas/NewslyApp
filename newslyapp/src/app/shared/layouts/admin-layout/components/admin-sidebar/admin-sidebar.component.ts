import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from "../../../../components/search/search.component";
import { CommonModule } from '@angular/common';
import { MENU_ITEMS } from './menu-data';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchComponent, CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSidebarComponent {
  @Output() closeSideNav = new EventEmitter<void>();
  @Input() isSidebarOpen: boolean = false;
  menuItems = MENU_ITEMS;
  
  onClose() {
    this.closeSideNav.emit();
  }
}
