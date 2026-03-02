import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { GuestsComponent } from './pages/guests/guests.component';
import { LayoutComponent } from './layout/layout.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [

  // Public route
  { path: 'login', component: LoginComponent },

  // Protected layout wrapper
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: DashboardComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'guests', component: GuestsComponent },

      // Default inside layout
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }