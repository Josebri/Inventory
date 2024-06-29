import { Component } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LoginComponent, RegisterComponent, RouterModule],
})
export class AppComponent {
  title = 'angular-standalone-project';
}

// Definir rutas fuera del decorador del componente
export const routes: Route[] = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
