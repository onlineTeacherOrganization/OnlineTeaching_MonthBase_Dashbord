import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { LateStudentComponent } from './LateStudent/LateStudent.component';
import { MatIconModule } from '@angular/material/icon';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  declarations: [LateStudentComponent, EditComponent]
})
export class LateStudentModule { }
