import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner'; 

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  BusyCount = 0;
  constructor(private ngspin: NgxSpinnerService) { }

  busy() {
    this.BusyCount++;
    this.ngspin.show(undefined, {
      type: 'ball-atom',
      size:'large'
   })
  }
  idle() {
    this.BusyCount--;
    if (this.BusyCount <= 0) {
      this.BusyCount = 0;
      this.ngspin.hide();
    }
  }
}
