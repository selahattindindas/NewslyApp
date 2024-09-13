import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityResponse } from '../models/city-response';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly nominatimUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';

  constructor(private http: HttpClient) {}

  getCityFromCoordinates(latitude: number, longitude: number): Observable<CityResponse> {
    const url = `${this.nominatimUrl}&lat=${latitude}&lon=${longitude}`;
    return this.http.get<CityResponse>(url);
  }

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}