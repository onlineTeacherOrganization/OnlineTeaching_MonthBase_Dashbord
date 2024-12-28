import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { catchError, first } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private cookies: CookieService,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      RememberMe: ['']
    });
    this.authenticationService.logout()
  }
  get email() {
    return this.loginForm.controls['email'].value;
  }
  get password() {
    return this.loginForm.controls['password'].value;
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.submit = false
      this.authenticationService
        .login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
        .pipe(first())
        .subscribe(
          (ele) => {
            if (this.loginForm.controls['RememberMe'].value) {
            }
            else {
              this.cookies.delete('currentUser');
            }
            this.toastr.success("تم تسجيل الدخول")
            this.loading = false;
            this.router.navigate(['dashboard']);
          },
          (err: any) => {
            this.error = err.error;
            this.loading = false;
            this.submit = true
            // this.toastr.error("لم يتم تسجيل الدخول")
          },
        );

    }
    else {
      this.toastr.error("ادخل جميع المدخلات")
    }

  }
  // This function is called when the user clicks on the submit buttoasdzxn.
  loading: boolean = false;
  submit: boolean = true

}