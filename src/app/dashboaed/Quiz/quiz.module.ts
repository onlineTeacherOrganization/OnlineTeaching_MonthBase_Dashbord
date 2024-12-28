import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from 'src/app/interceptors/token-interceptor.service';
import { QuizComponent } from './Quiz.component';
@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },]
})
export class QuizModule { }
