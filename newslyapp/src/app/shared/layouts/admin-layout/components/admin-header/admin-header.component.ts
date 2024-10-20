import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from "../../../../components/search/search.component";
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  onToggleSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.toggleSidebar.emit(); 
  }
  
  toggleMenu() {
    this.isOpen = !this.isOpen; 
  }
}
