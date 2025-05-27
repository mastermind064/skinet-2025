import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const snackbar = inject(SnackbarService)

  //disini proses nangkep eror api
  //interceptor --> test-error.component.ts --> test-error.component.html
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 400) {
        if (err.error.errors) {
          const modelStateEror = []
          for (const key in err.error.errors) {
            if (err.error.errors[key]) {
              modelStateEror.push(err.error.errors[key])
            }
          }
          // console.log(`modelStateEror: ${modelStateEror}`)
          throw modelStateEror.flat()
        } else {
          snackbar.error(err.error.title || err.error)
        }
      }
      if (err.status === 401) {
        snackbar.error(err.error.title || err.error)
      }
      if (err.status === 404) {
        router.navigateByUrl('/not-found')
      }
      if (err.status === 500) {
        // console.log('disini interceptor handle')
        const navigationExtras: NavigationExtras = {state: {error: err.error}}
        router.navigateByUrl('/server-error', navigationExtras)
      }
      return throwError(() => err)
    })
  )
};
