import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // <-- import RouterModule

@Component({
  selector: 'app-sidebar',
  standalone: true,              // <-- standalone component
  imports: [RouterModule],       // <-- import RouterModule for routerLink
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
}
