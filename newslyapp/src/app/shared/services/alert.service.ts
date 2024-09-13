import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AlertConfig } from '../models/alert-config';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private alertSubject = new Subject<AlertConfig | null>();
  alert$ = this.alertSubject.asObservable();

  showAlert(config: AlertConfig) {
    this.alertSubject.next(config);
    setTimeout(() => this.alertSubject.next(null), config.duration);
  }
}
