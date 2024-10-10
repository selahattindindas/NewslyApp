import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeSwitcherComponent } from '../../../../components/theme-switcher/theme-switcher.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StringHelper } from '../../../../utils/string-helper';
import { UserFooterComponent } from "../user-footer/user-footer.component";
import { CategoryService } from '../../../../../features/category.service';
import { ListCategory } from '../../../../models/categories/list-category';

@Component({
  selector: 'user-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, RouterLink, RouterLinkActive, UserFooterComponent],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss'
})

export class UserSidebarComponent implements OnInit{
  categories! : ListCategory[];
  @Output() closeSideNav = new EventEmitter<void>();
  @Input() isSidebarOpen: boolean = false;
  
  constructor(
    private categoryService: CategoryService, 
    private router: Router
  ){}

  ngOnInit(): void {
    this.getCategory();  
  }

  getCategory(){
    this.categoryService.getCategories().then((response) =>{
      this.categories = response;
    })
  }

  navigateToCategory(category: ListCategory) {
    const slug = StringHelper.convertToSlug(category.name);
    this.router.navigate([`${slug}`]);
    this.onClose();
  }

  onClose() {
    this.closeSideNav.emit();
  }
}
