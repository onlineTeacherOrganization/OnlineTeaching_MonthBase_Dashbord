import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((ele: HttpErrorResponse) => {
        if (ele.status) {
          switch (ele.status) {
            case (200): this.toastr.success('تمت العملية بنجاح');
              break;
            case (400):
              this.toastr.error(`حدث خطا ما`);
              break;
            case (404):
              this.toastr.warning(`لا يوجد`);
              this.router.navigate(['notfound']);
              break;
            case (401):
              this.toastr.info(`لا تملك الصلاحية`);
              // this.toastr.info(`${ele.message}`, `لا تملك الصلاحية`);

              break;
            case (500):
              const native: NavigationExtras = {
                state: { err: ele.error.errors }
              }
              this.toastr.error(" حدث خطا ما ");
              // this.toastr.error(`${ele.message}`, " حدث خطا ما ");
              break;
            default:
              this.toastr.error("Unexcepeted Error");
          }
        }
        throw ele;
      })
    )
  }
}
