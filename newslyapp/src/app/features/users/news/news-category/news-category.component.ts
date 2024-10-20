import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-news-category',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss'],
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
