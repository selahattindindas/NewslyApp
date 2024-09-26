import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NewsService } from '../../news.service';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { PopularNewsComponent } from '../../../popular-news/popular-news.component';
import { Category, NewsList } from '../news-create/news-create.component';
import { CommonModule } from '@angular/common';
import { StringHelper } from '../../../../shared/utils/string-helper';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { NewsContainerComponent } from '../news-container/news-container.component';

@Component({
  selector: 'app-news-category',
  standalone: true,
  imports: [SliderComponent, NewsContainerComponent, PopularNewsComponent, RouterOutlet, SidebarComponent, CommonModule, FooterComponent],
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss']
})
export class NewsCategoryComponent {
  selectedCategory!: string; 
  @Input() news: NewsList[] = [];
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['categoryName'];
      this.newsService.getCategories().subscribe((response) => {
        this.categories = response;
        this.fetchCategoryName(slug);
      });
    });
  }

  fetchCategoryName(slug: string) {
    const category = this.categories.find(cat => StringHelper.convertToSlug(cat.name) === slug);
    if (category) {
      this.selectedCategory = category.name;
      this.fetchData(this.selectedCategory);
    }
  }

  fetchData(categoryName: string) {
    this.newsService.getNewsByCategoryName(categoryName).subscribe((data) => {
      this.news = data;
    });
  }
}