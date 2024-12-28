import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LectureComponent } from './lecture/lecture.component';
import { DeleteComponent } from './delete/delete.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@NgModule({
  declarations: [AddComponent, EditComponent, LectureComponent, DeleteComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    AutocompleteLibModule
  ],
  exports: [MatAutocompleteModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ar-EG' // Use 'ar-EG' for Arabic (Egypt), change to your preferred Arabic locale
    }
  ]
})
export class LecturesModule { }
