import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Perfil } from '../../models/perfil.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = `${environment.apiUrl}perfil/`;

  constructor(private http: HttpClient) {}

  obtenerPerfiles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl);
  }

// id es opcional ahora
  obtenerPerfil(id?: number): Observable<Perfil> {
    if (id === undefined) {
      // Si no hay id, obtenemos todos y devolvemos el primero
      return this.http.get<Perfil[]>(this.apiUrl).pipe(
        map(perfiles => {
          if (perfiles.length > 0) {
            return perfiles[0];
          }
          throw new Error('No hay perfiles disponibles');
        })
      );
    } else {
      return this.http.get<Perfil>(`${this.apiUrl}${id}/`);
    }
  }

crearPerfil(formData: FormData): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.post(`${this.apiUrl}`, formData, { headers });
}

actualizarPerfil(id: number, formData: FormData): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.put(`${this.apiUrl}${id}/`, formData, { headers });
}

eliminarPerfil(id: number): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.delete(`${this.apiUrl}${id}/`, { headers });
}

}
