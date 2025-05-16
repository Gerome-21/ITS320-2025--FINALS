import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    HttpClientModule
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:3001/auth/login', loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Optionally save token to localStorage
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert(error.error.message || 'Login failed');
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}