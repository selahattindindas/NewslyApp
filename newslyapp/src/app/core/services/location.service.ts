import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CityResponse } from '../models/city-response';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly nominatimUrl = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = "68f100ded66db92df7d7257e953ced82";

  constructor(private httpClientService: HttpClientService) {}

  async getCityFromCoordinates(latitude: number, longitude: number): Promise<CityResponse> {
    const observable : Observable<CityResponse> =  this.httpClientService.get({
      fullEndPoint: `${this.nominatimUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`
    });
    return await firstValueFrom(observable);
  }

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}