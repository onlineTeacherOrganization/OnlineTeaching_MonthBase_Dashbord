import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-dashboaed',
  templateUrl: './dashboaed.component.html',
  styleUrls: ['./dashboaed.component.scss']
})
export class DashboaedComponent {
  currentUser!: User;

  constructor(private authenticationService: AuthService, private http: HttpClient
  ) {
    this.authenticationService.user.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {

  }

}
