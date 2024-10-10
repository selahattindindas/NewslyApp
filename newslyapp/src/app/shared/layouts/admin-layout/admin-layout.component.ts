import { Component } from '@angular/core';
import { AdminSidebarComponent } from "./components/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminSidebarComponent, RouterOutlet, AdminFooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
