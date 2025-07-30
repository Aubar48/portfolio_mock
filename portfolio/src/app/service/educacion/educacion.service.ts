import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Educacion } from '../../models/educacion.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiUrl = `${environment.apiUrl}educaciones/`;

  constructor(private http: HttpClient) {}

  getEducaciones(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.apiUrl);
  }

  getEducacion(id: number): Observable<Educacion> {
    return this.http.get<Educacion>(`${this.apiUrl}${id}/`);
  }

crearEducacion(formData: FormData): Observable<Educacion> {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.post<Educacion>(this.apiUrl, formData, { headers });
}

actualizarEducacion(id: number, formData: FormData): Observable<Educacion> {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.put<Educacion>(`${this.apiUrl}${id}/`, formData, { headers });
}

eliminarEducacion(id: number): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.delete(`${this.apiUrl}${id}/`, { headers });
}

}
