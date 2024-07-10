import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    // Aquí puedes agregar cualquier lógica adicional para el logout, como limpiar tokens
    localStorage.removeItem('token'); // Por ejemplo, eliminar el token de localStorage
    this.router.navigate(['/login']);
  }
}
