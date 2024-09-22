import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { NewsService } from '../../../features/news/news.service';
import { Category } from '../../../features/news/components/news-create/news-create.component';
import { Router, RouterLink } from '@angular/router';
import { SlugifyPipe } from '../../pipes/slugify.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, RouterLink, SlugifyPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  categories! : Category[];
  @Output() categoryChange = new EventEmitter<string>();
  
  constructor(private newsService: NewsService, private router: Router){}

  ngOnInit(): void {
    this.getCategory();  
  }

  onCategorySelect(category: string) {
    this.router.navigate([category]); 
  }

  getCategory(){
    this.newsService.getCategories().subscribe((response) =>{
      this.categories = response;
    })
  }
}
