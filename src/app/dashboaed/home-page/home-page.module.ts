import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { ShapsComponent } from '../charts/shaps/shaps.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [HomePageComponent, ShapsComponent],
  imports: [
    CommonModule, NgChartsModule, HttpClientModule
  ]
})
export class HomePageModule { }
