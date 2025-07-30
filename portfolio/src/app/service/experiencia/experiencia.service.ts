import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Experiencia } from '../../models/experiencia.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiUrl = `${environment.apiUrl}experiencias/`;

  constructor(private http: HttpClient) {}

  getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.apiUrl);
  }

  getExperiencia(id: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${this.apiUrl}${id}/`);
  }

  crearExperiencia(exp: Experiencia): Observable<Experiencia> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No definir Content-Type para que Angular gestione FormData
    });
    const formData = this.buildFormData(exp);
    return this.http.post<Experiencia>(this.apiUrl, formData, { headers });
  }

  actualizarExperiencia(id: number, exp: Experiencia): Observable<Experiencia> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const formData = this.buildFormData(exp);
    return this.http.put<Experiencia>(`${this.apiUrl}${id}/`, formData, { headers });
  }

  eliminarExperiencia(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }

  private buildFormData(exp: Experiencia): FormData {
    const formData = new FormData();
    formData.append('puesto', exp.puesto);
    formData.append('empresa', exp.empresa);
    formData.append('fecha', exp.fecha);

    if (exp.logo instanceof File) {
      formData.append('logo', exp.logo);
    } else if (typeof exp.logo === 'string' && exp.logo) {
      // Omitir si es string vacío, o podrías manejarlo como prefieras
      // Generalmente no se reenvía la URL en FormData
    }

    return formData;
  }
}
