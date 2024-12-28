import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenAccessGuard implements CanActivate {

  constructor(private router: Router, private cookies: CookieService) { }

  canActivate() {
    const canActivate = JSON.parse(localStorage.getItem('currentUser')!)?.toke;
    const token = this.cookies.get('currentUser');
    const check = this.cookies.check('currentUser');

    if (check) {
      console.log(check);
      return true; // Allow access to the route
    } else {
      console.log(check);
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
  }
}
