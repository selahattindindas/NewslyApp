import { Component, OnInit } from '@angular/core';
import { DragBarsComponent } from "./components/drag-bars/drag-bars.component";
import { NewsList } from '../../../shared/models/news/list-news';
import { NewsService } from '../../../core/services/news.service';
import { ListCategory } from '../../../shared/models/categories/list-category';
import { DateChartComponent } from "./components/date-chart/date-chart.component";
import { SmoothedLineComponent } from "./components/smoothed-line/smoothed-line.component";
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DragBarsComponent, DateChartComponent, SmoothedLineComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
 news: NewsList[] = [];
 categories: ListCategory[] = [];
 constructor(private newsService: NewsService, private categoryService: CategoryService){};

 ngOnInit(): void {
  this.getCategory();
  this.getNews();
 }

 async getCategory(){
  await this.categoryService.getCategories().then(data =>{
    this.categories = data;
  })
 }

 async getNews(){
  await this.newsService.getNews().then(data =>{
    this.news = data;
  })
 }
}
