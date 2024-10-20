import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CityResponse } from '../../../core/models/city-response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  city: string = '';
  temperature: number | undefined;
  weatherCode!: number;
  icon: string | undefined;

  constructor(
    private locationService: LocationService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getWeather();
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

  getWeather() {
    this.locationService.getCurrentPosition()
      .then(position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        this.locationService.getCityFromCoordinates(latitude, longitude).then(
          (weatherData: any) => {
            this.city = weatherData.name;
            this.temperature = this.convertKelvinToCelsius(weatherData.main.temp);
            this.icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
          });
      })
      .catch(error => {
        error = 'Konum bilgisi alınamadı';
      });
  }

  convertKelvinToCelsius(kelvin: number): number {
    return Math.round(kelvin - 273.15);
  }
}