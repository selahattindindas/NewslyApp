import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StringHelper } from '../../utils/string-helper';
import { FooterComponent } from "../footer/footer.component";
import { NewsService } from '../../../features/news.service';
import { CategoryService } from '../../../features/category.service';
import { ListCategory } from '../../models/categories/list-category';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit{
  categories! : ListCategory[];
  @Output() closeSideNav = new EventEmitter<void>();
  @Input() isSidebarOpen: boolean = false;
  
  constructor(private categoryService: CategoryService, private router: Router){}

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
