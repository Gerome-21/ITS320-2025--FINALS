import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userProfile: any = {};

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
      },
      error: (err) => {
        console.error('Profile fetch failed', err);
        this.router.navigate(['/login']); // Redirect if not authenticated
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
