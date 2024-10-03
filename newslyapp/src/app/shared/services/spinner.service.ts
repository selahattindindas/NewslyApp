import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loading: boolean = false;

  setLoading(isLoading: boolean): boolean {
    this.loading = isLoading;
    return this.loading;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
