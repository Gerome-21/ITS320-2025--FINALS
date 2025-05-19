import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todo';

  constructor(private http: HttpClient) {}

  getTodosByCategoryId(categoryId: string): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`, { headers });
  }

  createTodo(todoData: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http.post<any>(`${this.apiUrl}/create`, todoData, { headers });
  }
}
