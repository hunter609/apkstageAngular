import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Personnel } from '../../components/admin/personnel/personnel.component'; // Importez l'interface Personnel correcte

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
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

  getPersonnels(): Observable<Personnel[]> {
    // Utilisez les en-têtes avec le token dans la requête
    const headers = this.createAuthorizationHeader();
    return this.http.get<Personnel[]>(`${this.apiUrl}/personnels`, { headers });
  }

  addPersonnel(personnel: Personnel): Observable<number> {
    // Utilisez les en-têtes avec le token dans la requête
    const headers = this.createAuthorizationHeader();
    return this.http.post<number>(`${this.apiUrl}/personnels`, personnel, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout du personnel :', error);
        return throwError('Une erreur est survenue lors de l\'ajout du personnel');
      }),
      map((response: any) => response.id)
    );
  }

  deletePersonnel(id: number): Observable<void> {
    // Utilisez les en-têtes avec le token dans la requête
    const headers = this.createAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/personnels/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression du personnel :', error);
        return throwError('Une erreur est survenue lors de la suppression du personnel');
      })
    );
  }
}
