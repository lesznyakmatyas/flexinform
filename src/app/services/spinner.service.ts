import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private totalRequests = 0;
  private spinnerService = inject(NgxSpinnerService);

  busy() {
    this.totalRequests++;
    this.spinnerService.show(undefined, {
      type: 'ball-clip-rotate',
      size: 'large',
    });
  }

  idle() {
    this.totalRequests--;
    if (this.totalRequests <= 0) {
      this.totalRequests = 0;
      this.spinnerService.hide();
    }
  }
}
