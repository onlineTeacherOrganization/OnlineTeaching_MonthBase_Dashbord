import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { QuestionComponent } from './Question/Question.component';
import { EditComponent } from './Edit/Edit.component';
import { AddComponent } from './Add/Add.component';
import { TokenInterceptorService } from 'src/app/interceptors/token-interceptor.service';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIconModule, ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [],
  declarations: [QuestionComponent, EditComponent, AddComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },]
})
export class QuestionsModule { }
