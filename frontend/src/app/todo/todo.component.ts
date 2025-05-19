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
      .get<any[]>(`http://localhost:3001/api/todos/category/${this.categoryId}`, { headers }) // <-- fixed url here
      .subscribe({
        next: (data) => {
          this.todos = data;
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


  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.createTodo();
    }
  }
}
