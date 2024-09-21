import { Component } from '@angular/core';
import { SliderComponent } from "../../shared/components/slider/slider.component";
import { CardComponent } from "../../shared/components/card/card.component";
import { PopularNewsComponent } from '../popular-news/popular-news.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CardComponent, PopularNewsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
