import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input() showSvg: boolean = true;
  @Input() inputClass: string = '';
  @Input() buttonClass: string = '';
  @Input() searchDivClass: string = '';
  searchTerm: string = '';

  constructor(private searchService: SearchService, private router: Router) {}

  onSearch() {
    this.router.navigate(['/search'], {
      queryParams: { title: this.searchTerm }
      
    });
    this.searchTerm = '';
    this.searchService.setSearchTerm(this.searchTerm);
  }
}
