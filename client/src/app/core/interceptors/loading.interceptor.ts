import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

//untuk fake loading. jangan lupa tambahkan di app.config.ts
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService)

  busyService.busy() //buat biar loading = true

  return next(req).pipe(
    delay(500),
    finalize(() => busyService.idle())// setelah 500 ms, balikin jadi idle
  )
};
