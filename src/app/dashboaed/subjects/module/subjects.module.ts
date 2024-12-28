import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { SubjectsComponent } from '../subjects/subjects.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/interceptors/token-interceptor.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';



@NgModule({
  declarations: [AddComponent, SubjectsComponent, EditComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    AutocompleteLibModule
  ]
  , providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },]
})
export class SubjectsModule { }
