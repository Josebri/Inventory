import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginForm.value)
        });
        
        if (!response.ok) {
          throw new Error('Login error');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Login error', error);
      }
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
