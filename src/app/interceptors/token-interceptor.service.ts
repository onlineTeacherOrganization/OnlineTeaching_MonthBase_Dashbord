import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private cookies: CookieService) { }
  errors: any
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { token } = this.authService.userValue;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.userValue.token}`,
        },
      });
    }
    else {
      const check = this.cookies.check('currentUser');
      if (check) {
        var DateNow = new Date();
        if (DateNow < new Date(JSON.parse(this.cookies.get('currentUser')!).expireDate)) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${JSON.parse(this.cookies.get('currentUser')!)?.token}`,
            },
          });
        }
      }
      else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')!)?.token}`,
          },
        });
      }

    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout();
        }
        const error = err;
        return throwError(error);
      })
    );
  }
}
