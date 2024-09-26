import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { NewsService } from '../../../features/news/news.service';
import { Category } from '../../../features/news/components/news-create/news-create.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StringHelper } from '../../utils/string-helper';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit{
  categories! : Category[];
  
  constructor(private newsService: NewsService, private router: Router){}

  ngOnInit(): void {
    this.getCategory();  
  }

  getCategory(){
    this.newsService.getCategories().subscribe((response) =>{
      this.categories = response;
    })
  }

  getFormattedCategory(category: Category): string {
    return StringHelper.convertToSlug(category.name); 
  }
}
