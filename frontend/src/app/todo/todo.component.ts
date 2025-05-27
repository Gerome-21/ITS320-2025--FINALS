import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() categoryId!: string;
  todos: any[] = [];
  newTodoName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.categoryId) {
      this.getTodos();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryId'] && this.categoryId) {
      this.getTodos();
    }
  }

  getTodos() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    this.http
      .get<any[]>(`http://localhost:3001/api/todos/category/${this.categoryId}`, { headers })
      .subscribe({
        next: (data) => {
          // Initialize editing and confirmDelete flags per todo
          this.todos = data.map(todo => ({ ...todo, editing: false, confirmDelete: false }));
        },
        error: (err) => {
          console.error('Failed to fetch todos:', err);
        }
      });
  }

  createTodo() {
    if (!this.newTodoName.trim()) return;

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    const payload = {
      todo_name: this.newTodoName,
      todo_description: '',
      category_id: this.categoryId,
      status: 'not_started',
    };

    this.http.post('http://localhost:3001/api/todos/create', payload, { headers }).subscribe({
      next: () => {
        this.newTodoName = '';
        this.getTodos();
      },
      error: (err) => {
        console.error('Error creating todo:', err);
      }
    });
  }

  toggleEditTodo(todo: any) {
    if (!todo.todo_name.trim()) {
      alert('Todo name cannot be empty');
      return;
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    const payload = {
      todo_name: todo.todo_name,
      todo_description: todo.todo_description,
      status: todo.status,
    };

    this.http.put(`http://localhost:3001/api/todos/${todo._id}`, payload, { headers }).subscribe({
      next: () => {
        todo.editing = false;
        this.getTodos();
      },
      error: (err) => {
        console.error('Error updating todo:', err);
        alert('Failed to update todo');
      }
    });
  }

  deleteTodo(todoId: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    this.http.delete(`http://localhost:3001/api/todos/${todoId}`, { headers }).subscribe({
      next: () => {
        this.getTodos();
      },
      error: (err) => {
        console.error('Error deleting todo:', err);
        alert('Failed to delete todo');
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.createTodo();
    }
  }
}
