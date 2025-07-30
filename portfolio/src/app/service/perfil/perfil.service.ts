import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Perfil } from '../../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = `${environment.apiUrl}perfil/`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  obtenerPerfiles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl);
  }

// Obtener el perfil del usuario autenticado
obtenerPerfil(): Observable<Perfil> {
  const headers = this.getAuthHeaders();
  return this.http.get<Perfil>(`${this.apiUrl}perfil/`, { headers });
}


  crearPerfil(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, formData, { headers });
  }

  actualizarPerfil(id: number, formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}${id}/`, formData, { headers });
  }

  eliminarPerfil(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }

}
