import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin', component: AdminInventoryComponent }
  
];