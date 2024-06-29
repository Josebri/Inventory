// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <div>
      <h2>Register</h2>
      <!-- <form (ngSubmit)="onSubmit()">
        <input type="text" [(ngModel)]="username" name="username" placeholder="Username" required>
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
      </form> -->
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [FormsModule]
})
export class RegisterComponent {
  // username: string;
  // email: string;
  // password: string;

  // onSubmit() {
  //   console.log(this.username, this.email, this.password);
  //   // Aquí añadirías la lógica para registrar al usuario
  // }
}
