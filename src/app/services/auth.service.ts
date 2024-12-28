import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  NavCondition = new BehaviorSubject<any>(localStorage.getItem('login'));
  constructor(private http: HttpClient, private router: Router,
    private cookies: CookieService
  ) {
    if (JSON.parse(localStorage.getItem('currentUser')!) ||
      (this.cookies.get("currentUser"))
    ) {
      this.userSubject = new BehaviorSubject<User>(
        { email: this.cookies.get("email"), password: this.cookies.get("password"), token: this.cookies.get("token") }
      );
    }
    else {
      this.userSubject = new BehaviorSubject<User>({
        email: "",
        password: '',
        token: ""
      });
    }
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  login(username: string, password: string) {
    console.log(username)
    return this.http
      .post<any>(`${environment.BaseUrl}Auth/Login`, {
        "email": username,
        "password": password
      })
      .pipe(
        map((token) => {
          console.log(token)
          let user: any = {
            email: username,
            password: password,
            token: token.message,
            expireDate: token.expireDate
          };
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.cookies.set('currentUser', JSON.stringify(user))
          this.userSubject.next(user);
          this.userValue;
          return user;
        })
      );
  }

  logout() {
    this.cookies.delete('currentUser');
    localStorage.removeItem('currentUser');
    this.userSubject.next({
      email: "",
      password: '',
      token: ""
    });
    // this.cookies.delete('currentUser');
    this.router.navigate(['/login']);
  }
}
