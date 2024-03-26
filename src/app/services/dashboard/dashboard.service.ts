import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getEntreprises(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entreprises`);
  }
}