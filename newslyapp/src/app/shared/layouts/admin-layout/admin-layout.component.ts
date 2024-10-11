import { Component } from '@angular/core';
import { AdminSidebarComponent } from "./components/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminSidebarComponent, RouterOutlet, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
