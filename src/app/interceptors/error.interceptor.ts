import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      if (err) {
        switch (err.status) {
          case 404:
            if (err.error) {
              toastr.error(err.error.error, err.status);
            }
            break;

          default:
            toastr.error('Something went wrong!');
            break;
        }
      }
      throw err;
    })
  );
};
