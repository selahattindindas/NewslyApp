import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CityResponse } from '../../../core/models/city-response';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  city: string = '';

  constructor(
    private locationService: LocationService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getLocation();
    }
  }

  getLocation() {
    this.locationService.getCurrentPosition()
      .then(position => {
        const { latitude, longitude } = position.coords;
        this.locationService.getCityFromCoordinates(latitude, longitude).then(
          (data: CityResponse) => {
            this.city = data.address.province;
        });
      })
      .catch(error => {
        error = 'Konum bilgisi alınamadı';
      });
  }
}