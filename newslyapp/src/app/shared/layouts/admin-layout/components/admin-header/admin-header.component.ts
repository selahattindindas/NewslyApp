import { Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from "../../../../components/search/search.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();  
  isOpen : boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  openSidenav() {
    this.toggleSidebar.emit();
  }

  logout(){
    this.authService.removeToken();
    this.router.navigate(['/admin', 'login'])
  }

  toggleMenu() {
    this.isOpen = !this.isOpen; 
  }
}
