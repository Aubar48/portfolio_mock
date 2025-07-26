import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tecnologia } from '../../models/tecnologia.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  private apiUrl = `${environment.apiUrl}tecnologias/`;

  constructor(private http: HttpClient) {}

  obtenerTecnologias(): Observable<Tecnologia[]> {
    return this.http.get<Tecnologia[]>(this.apiUrl);
  }

  crearTecnologia(data: any): Observable<Tecnologia> {
    return this.http.post<Tecnologia>(this.apiUrl, data);
  }

  actualizarTecnologia(id: number, data: any): Observable<Tecnologia> {
    return this.http.put<Tecnologia>(`${this.apiUrl}${id}/`, data);
  }

  eliminarTecnologia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
