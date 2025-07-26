import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Perfil } from '../../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = `${environment.apiUrl}perfil/`;

  constructor(private http: HttpClient) {}

  obtenerPerfiles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl);
  }

  obtenerPerfil(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}${id}/`);
  }

crearPerfil(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}`, formData);
}

actualizarPerfil(id: number, formData: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}${id}/`, formData);
}



  eliminarPerfil(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
