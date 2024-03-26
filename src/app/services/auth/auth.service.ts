import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(pseudo: string, password: string, role: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/existe${role}?pseudo=${pseudo}&password=${password}`);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
