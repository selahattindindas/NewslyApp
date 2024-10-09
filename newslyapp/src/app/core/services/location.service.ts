import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CityResponse } from '../models/city-response';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly nominatimUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';

  constructor(private httpClientService: HttpClientService) {}

  async getCityFromCoordinates(latitude: number, longitude: number): Promise<CityResponse> {
    const observable : Observable<CityResponse> =  this.httpClientService.get({
      fullEndPoint: `${this.nominatimUrl}&lat=${latitude}&lon=${longitude}`
    });
    return await firstValueFrom(observable);
  }

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}