import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from '../add/add.component';
import { ReviewComponent } from '../review/review.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/interceptors/token-interceptor.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [AddComponent, ReviewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    MatSortModule
  ]
  , providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },]
})
export class ReviewsModule { }
