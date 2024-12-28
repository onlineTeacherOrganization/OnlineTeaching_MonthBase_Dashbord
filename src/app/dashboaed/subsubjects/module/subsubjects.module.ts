import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { SubsubjectComponent } from '../subsubject/subsubject.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { TokenInterceptorService } from 'src/app/interceptors/token-interceptor.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentsComponent } from '../students/students.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { LockstudentsComponent } from '../lockstudents/lockstudents.component';
@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    SubsubjectComponent,
    StudentsComponent,
    LockstudentsComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    AutocompleteLibModule,
    MatPaginatorModule,
  ],
  exports: [
    MatIconModule,
    MatIcon
  ], providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },]
})
export class SubsubjectsModule { }
