import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      profile: ['user']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.dataService.register(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
