import { Component, OnInit } from '@angular/core';
import { AlertType } from '../../models/alert-config';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone: true,
  imports:[CommonModule],
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  isVisible = false;
  message: string = '';
  type: AlertType = AlertType.Info;
  icon?: string;
  AlertType = AlertType;
  animationClass: string = 'slide-in';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alert$.subscribe(config => {
      if (config) {
        this.message = config.message;
        this.type = config.type;
        this.icon = config.icon;
        this.isVisible = true;
        this.animationClass = 'slide-in';

        setTimeout(() => {
        this.animationClass = 'slide-out';
        setTimeout(() => {
          this.isVisible = false;
        }, 500); 
      }, 2000);
    }
    });
  }
}
