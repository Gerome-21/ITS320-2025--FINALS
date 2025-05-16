import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001/auth';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
}
