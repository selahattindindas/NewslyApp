import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../core/services/user.auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { AlertConfig, AlertType } from '../../../shared/models/alert-config';
import { MessageText } from '../../../shared/utils/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private userAuthService: UserAuthService, private alertService: AlertService) { };

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      this.userAuthService.login(email, password).then(response => {
        if (response.success) {
          this.alertService.showAlert(new AlertConfig(MessageText.LoginSuccess, AlertType.Success));
          this.router.navigate(['/admin']);
        } else {
          this.alertService.showAlert(new AlertConfig(MessageText.LoginError, AlertType.Error));
        }
      });
    }
  }
}

