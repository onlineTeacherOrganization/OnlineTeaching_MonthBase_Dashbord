import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExamComponent } from './exam/exam.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TokenInterceptorService } from 'src/app/interceptors/token-interceptor.service';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { AssignmentComponent } from '../assignment/assignment.component';
import { QuzitestComponent } from '../quzi-test/quzitest.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfrimComponent } from './confrim/confrim.component';

@NgModule({
  declarations: [ExamComponent, ExamComponent, EditComponent, AddComponent,AssignmentComponent,QuzitestComponent, ConfrimComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    AutocompleteLibModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
    ]
})
export class ExamsModule { }
