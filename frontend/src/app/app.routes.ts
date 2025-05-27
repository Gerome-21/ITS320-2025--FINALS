import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CompletedTodosComponent } from './completed-todos/completed-todos.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'completed-todos', component: CompletedTodosComponent },
  { path: 'completed-todo', redirectTo: 'completed-todos', pathMatch: 'full' },

];