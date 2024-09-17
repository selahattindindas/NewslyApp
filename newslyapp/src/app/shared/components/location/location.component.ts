import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";
import { CityResponse } from '../../../core/models/city-response';
import { AlertService } from '../../services/alert.service';
import { AlertConfig, AlertType } from '../../models/alert-config';
import { SliderComponent } from "../slider/slider.component";
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, SliderComponent, CardComponent],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  city: string = '';
  errorMessage: string = '';

  constructor(
    private locationService: LocationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private alertService: AlertService
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
        this.locationService.getCityFromCoordinates(latitude, longitude).subscribe({
          next: (data: CityResponse) => {
            this.city = data.address.province;
          }
        });
      })
      .catch(error => {
        this.errorMessage = 'Konum bilgisi alınamadı';
      });
  }

  triggerSuccessAlert() {
    this.alertService.showAlert(new AlertConfig('Başarıyla tamamlandı!', AlertType.Success));
  }

  triggerErrorAlert() {
    this.alertService.showAlert(new AlertConfig('Bir hata oluştu!', AlertType.Error));
  }

  triggerWarningAlert() {
    this.alertService.showAlert(new AlertConfig('Uyarı bu işlem yapılamaz!', AlertType.Warning));
  }

  triggerInfoAlert() {
    this.alertService.showAlert(new AlertConfig('Güncellemek için kaydet butonuna basınız!', AlertType.Info));
  }
}