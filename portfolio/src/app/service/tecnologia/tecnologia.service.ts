import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // Si no necesitas token para GET, dejamos así
    return this.http.get<Tecnologia[]>(this.apiUrl);
  }

  crearTecnologia(data: any): Observable<Tecnologia> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No seteamos Content-Type para que Angular detecte si es FormData o JSON
    });
    return this.http.post<Tecnologia>(this.apiUrl, data, { headers });
  }

  actualizarTecnologia(id: number, data: any): Observable<Tecnologia> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Tecnologia>(`${this.apiUrl}${id}/`, data, { headers });
  }

  eliminarTecnologia(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }
}
