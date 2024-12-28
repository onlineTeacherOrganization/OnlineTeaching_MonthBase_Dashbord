import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DashboaedRoutingModule } from './dashboaed-routing.module';
import { DashboaedComponent } from './dashboaed.component';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { SidebarComponent } from '../main-layout/sidebar/sidebar.component';
import { NavbarComponent } from '../main-layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TokenInterceptorService } from '../interceptors/token-interceptor.service';
import { NavComponent } from '../main-layout/nav/nav.component';
import { NgChartsModule } from 'ng2-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboaedComponent,
    NavbarComponent,
    NavComponent,
    MainLayoutComponent,
    SidebarComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    DashboaedRoutingModule,
    NgChartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    FormsModule,
    NgChartsModule,
    HttpClientModule,
    RouterModule,
    DashboaedRoutingModule,
    NgChartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatIcon,
    MatButton,
    MatButtonModule,
  ], providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ]
})
export class DashboaedModule { }
/*
import:
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
  MatSnackBarModule,
  export
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    RouterModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatIcon,
    MatButton,
    MatButtonModule,

*/