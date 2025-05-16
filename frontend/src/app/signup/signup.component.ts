import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule // ✅ This is what solves the error
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      const { username, email, password } = this.signupForm.value;
      this.http.post<any>('http://localhost:3001/auth/signup', { username, email, password }).subscribe({
        next: (res) => {
          console.log('Signup successful', res);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Signup failed', err);
        }
      });
    } else {
      alert('Form is invalid or passwords do not match.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
