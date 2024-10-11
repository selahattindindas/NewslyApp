import { Component } from '@angular/core';
import { SearchComponent } from "../../../../components/search/search.component";

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

}
