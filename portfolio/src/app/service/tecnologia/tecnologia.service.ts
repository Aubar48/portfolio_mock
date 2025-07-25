import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tecnologia } from '../../models/tecnologia.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  private apiUrl = `${environment.apiUrl}/tecnologias/`;

  constructor(private http: HttpClient) {}

  getTecnologias(): Observable<Tecnologia[]> {
    return this.http.get<Tecnologia[]>(this.apiUrl);
  }

  getTecnologia(id: number): Observable<Tecnologia> {
    return this.http.get<Tecnologia>(`${this.apiUrl}${id}/`);
  }

  crearTecnologia(tecnologia: Tecnologia): Observable<Tecnologia> {
    return this.http.post<Tecnologia>(this.apiUrl, tecnologia);
  }

  actualizarTecnologia(id: number, tecnologia: Tecnologia): Observable<Tecnologia> {
    return this.http.put<Tecnologia>(`${this.apiUrl}${id}/`, tecnologia);
  }

  eliminarTecnologia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
