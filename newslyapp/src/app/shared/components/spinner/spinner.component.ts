import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  constructor(private spinnerService: SpinnerService) {}

  isLoading(): boolean {
    return this.spinnerService.isLoading();
  }
}
