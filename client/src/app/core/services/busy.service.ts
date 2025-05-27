import { Injectable } from '@angular/core';

//digunakan untuk service ketika loading
@Injectable({
  providedIn: 'root'
})
export class BusyService {
  loading = false;
  busyRequestCount = 0

  busy() {
    this.busyRequestCount++
    this.loading = true
  }

  idle() {
    this.busyRequestCount--
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0
      this.loading = false
    }
  }
}
