import { Component, OnInit } from '@angular/core';
import { DragBarsComponent } from "./components/drag-bars/drag-bars.component";
import { NewsList } from '../../../shared/models/news/list-news';
import { NewsService } from '../../news.service';
import { CategoryService } from '../../category.service';
import { ListCategory } from '../../../shared/models/categories/list-category';
import { DateChartComponent } from "./components/date-chart/date-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DragBarsComponent, DateChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
 news: NewsList[] = [];
 categories: ListCategory[] = [];
 constructor(private newsService: NewsService, private categoryService: CategoryService){};

 ngOnInit(): void {
   this.newsService.getNews().then(data =>{
    this.news = data;
    this.categoryService.getCategories().then(data =>{
      this.categories = data;
    })
   });
 }
}
