import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { SidebarComponent } from '../sidebar/sidebar.component';  // <-- Import SidebarComponent

@Component({
  selector: 'app-completed-todos',
  standalone: true,
  imports: [CommonModule, SidebarComponent], // <-- Add SidebarComponent here
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.css']
})
export class CompletedTodosComponent implements OnInit {
  completedTodos: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchCompletedTodos();
  }

  fetchCompletedTodos() {
    this.todoService.getCompletedTodos().subscribe({
      next: (todos) => {
        this.completedTodos = todos;
      },
      error: (err) => {
        console.error('Failed to fetch completed todos:', err);
      }
    });
  }
}
