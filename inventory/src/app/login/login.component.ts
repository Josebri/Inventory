import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule], // FormsModule debe estar importado aquí si es standalone
  standalone: true
})
export class LoginComponent {
  // lógica del componente
}
