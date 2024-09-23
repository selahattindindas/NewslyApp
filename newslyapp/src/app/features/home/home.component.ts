import { Component, OnInit } from '@angular/core';
import { SliderComponent } from "../../shared/components/slider/slider.component";
import { CardComponent, Test } from "../../shared/components/card/card.component";
import { PopularNewsComponent } from '../popular-news/popular-news.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NewsService } from '../news/news.service';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CardComponent, PopularNewsComponent, FooterComponent, RouterOutlet, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit {
  selectedCategory!: string; 
  news: Test[] = [];

  constructor(private route: ActivatedRoute, private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['categoryName']; 
      this.fetchData(this.selectedCategory);
    });
  }

  fetchData(categoryName: string) {
    this.newsService.getCategoryIdByName(categoryName).subscribe(response => {
      if (response) {
        const id = response.categoryId;
        this.newsService.getNewsByCategoryId(id).subscribe(data => {
          this.news = data; 
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
