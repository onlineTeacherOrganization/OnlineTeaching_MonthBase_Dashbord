import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    const currentUser = this.authService.userValue;
    if (currentUser) {
      return true;
    }
    else if (JSON.parse(localStorage.getItem('currentUser')!)?.token) {
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }
}
