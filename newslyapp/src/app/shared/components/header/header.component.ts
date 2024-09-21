import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { LocationComponent } from "../location/location.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, LocationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
