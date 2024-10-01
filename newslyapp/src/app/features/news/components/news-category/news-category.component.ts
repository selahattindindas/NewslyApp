import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NewsService } from '../../news.service';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { PopularNewsComponent } from '../../../popular-news/popular-news.component';
import { Category, NewsList } from '../news-create/news-create.component';
import { CommonModule } from '@angular/common';
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
  categoryName!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['nameSlug'];
    });
  }
}
