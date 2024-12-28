import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private cookies: CookieService) { }
  ngOnInit(): void {
    this.checkf()
  }

  checkf() {
    const token = this.cookies.get('currentUser');
    const check = this.cookies.check('currentUser');
    if (check) {
      var DateNow = new Date();
      if (DateNow < new Date(JSON.parse(this.cookies.get('currentUser')!).expireDate)) {
        this.router.navigate(['/dashboard']);
        console.log("dashborad")
      }
      else {
        this.router.navigate(['/login']);
        console.log("login")
      }
      return true; // Allow access to the route
    } else {
      return false;
    }
  }
}

