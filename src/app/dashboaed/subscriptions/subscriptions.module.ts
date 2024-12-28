import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/interceptors/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LockComponent } from './lock/lock.component';
@NgModule({
  declarations: [SubscriptionsComponent, AddComponent, EditComponent, LockComponent],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatIconModule,
    MatRadioModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [
    MatCheckboxModule,
    MatTableModule,
  ]
  , providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },]
})
export class SubscriptionsModule { }
