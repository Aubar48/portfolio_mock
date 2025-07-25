import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Educacion } from '../../models/educacion.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiUrl = `${environment.apiUrl}/educaciones/`;

  constructor(private http: HttpClient) {}

  getEducaciones(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.apiUrl);
  }

  getEducacion(id: number): Observable<Educacion> {
    return this.http.get<Educacion>(`${this.apiUrl}${id}/`);
  }

  crearEducacion(edu: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(this.apiUrl, edu);
  }

  actualizarEducacion(id: number, edu: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.apiUrl}${id}/`, edu);
  }

  eliminarEducacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
