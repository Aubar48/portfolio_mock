import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    const formData = this.buildFormData(exp);
    return this.http.post<Experiencia>(this.apiUrl, formData);
  }

  actualizarExperiencia(id: number, exp: Experiencia): Observable<Experiencia> {
    const formData = this.buildFormData(exp);
    return this.http.put<Experiencia>(`${this.apiUrl}${id}/`, formData);
  }

  eliminarExperiencia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  private buildFormData(exp: Experiencia): FormData {
    const formData = new FormData();
    formData.append('puesto', exp.puesto);
    formData.append('empresa', exp.empresa);
    formData.append('fecha', exp.fecha);

    if (exp.logo instanceof File) {
      formData.append('logo', exp.logo);
    } else if (typeof exp.logo === 'string') {
      // En caso que envíes URL o string vacío (no subir)
      formData.append('logo', exp.logo);
    }

    return formData;
  }
}
