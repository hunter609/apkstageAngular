import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(pseudo: string, password: string, role: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/existe${role}?pseudo=${pseudo}&password=${password}`)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', role);
          localStorage.setItem('prenom', response.prenom);
          const redirectUrl = localStorage.getItem('redirectUrl');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrl');
            window.location.href = redirectUrl;
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    localStorage.removeItem('prenom');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
