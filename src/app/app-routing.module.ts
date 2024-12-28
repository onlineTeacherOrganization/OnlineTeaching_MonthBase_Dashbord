import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { DashboaedComponent } from './dashboaed/dashboaed.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { preventUnsaveChangesGuard } from './guards/prevent-unsave-changes.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboaed/dashboaed.module').then((m) => m.DashboaedModule), component: DashboaedComponent,
    canActivate: [AuthGuardService], canDeactivate: [preventUnsaveChangesGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: '**', component: NotFoundComponent },
  // { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
