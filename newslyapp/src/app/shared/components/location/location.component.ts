import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from '../../directives/theme.directive';
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ThemeDirective, ThemeSwitcherComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit{

  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string = '';

  constructor(private locationService: LocationService, private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.locationService.getLocation().then((position) => {
      this.latitude = position.latitude;
      this.longitude = position.longitude;

      this.cd.detectChanges();
    }).catch((error) => {
      this.errorMessage = error;

      this.cd.detectChanges();
    });
  }
}
