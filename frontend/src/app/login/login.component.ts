import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Replace with actual authentication logic later
    console.log("Login button clicked"); // Debugging step
    this.router.navigate(['/home']); // Redirect to home after login
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

}