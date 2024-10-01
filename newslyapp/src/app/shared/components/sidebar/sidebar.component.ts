import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { NewsService } from '../../../features/news/news.service';
import { Category } from '../../../features/news/components/news-create/news-create.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StringHelper } from '../../utils/string-helper';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit{
  categories! : Category[];
  @Output() closeSideNav = new EventEmitter<void>();
  @Input() isSidebarOpen: boolean = false;
  
  constructor(private newsService: NewsService, private router: Router){}

  ngOnInit(): void {
    this.getCategory();  
  }

  getCategory(){
    this.newsService.getCategories().subscribe((response) =>{
      this.categories = response;
    })
  }

  navigateToCategory(category: Category) {
    const slug = StringHelper.convertToSlug(category.name);
    this.router.navigate([`${slug}`]);
    this.onClose();
  }

  onClose() {
    this.closeSideNav.emit();
  }
}
