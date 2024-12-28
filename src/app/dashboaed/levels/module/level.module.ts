import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from '../add/add.component';
import { LevelComponent } from '../level/level.component';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostlevelComponent } from '../postlevel/postlevel.component';

@NgModule({
  declarations: [AddComponent, LevelComponent ,PostlevelComponent],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
  ],
  exports: [
    MatIcon
  ]
})
export class LevelModule { }
