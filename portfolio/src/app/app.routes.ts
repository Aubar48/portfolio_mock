import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { NotFound } from './pages/not-found/not-found';
import { AuthGuard } from './guards/auth-guard'; // Importá tu guard

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard] // Protegemos esta ruta
  },
  { path: '**', component: NotFound }
];
