import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntreprisesService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  enregistrerEntreprise(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enregistrer`, formData);
  }

  getEntreprises(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entreprises`);
  }

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/section`);
  }

  getDivisions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/division`);
  }

}
