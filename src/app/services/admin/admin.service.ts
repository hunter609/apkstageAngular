import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl: string = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  // Fonction pour obtenir le token d'authentification du localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Fonction pour créer les en-têtes HTTP avec le token d'authentification
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAdmins(): Observable<any[]> {
    // Utilisez les en-têtes avec le token dans la requête
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.apiUrl}/admins`, { headers });
  }

  addAdmin(admin: any): Observable<any> {
    // Utilisez les en-têtes avec le token dans la requête
    const headers = this.createAuthorizationHeader();
    return this.http.post<any>(`${this.apiUrl}/admins`, admin, { headers });
  }

  deleteAdmin(id: number): Observable<void> {
    // Utilisez les en-têtes avec le token dans la requête
    const headers = this.createAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/admins/${id}`, { headers });
  }
}
