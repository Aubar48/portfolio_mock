import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../../models/experiencia.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiUrl = `${environment.apiUrl}/experiencias/`;
  
  constructor(private http: HttpClient) {}

  getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.apiUrl);
  }

  getExperiencia(id: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${this.apiUrl}${id}/`);
  }

  crearExperiencia(exp: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(this.apiUrl, exp);
  }

  actualizarExperiencia(id: number, exp: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(`${this.apiUrl}${id}/`, exp);
  }

  eliminarExperiencia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
