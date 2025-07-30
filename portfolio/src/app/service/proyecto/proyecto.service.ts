import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../../models/proyecto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = `${environment.apiUrl}proyectos/`;

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  getProyecto(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}${id}/`);
  }

  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No pongas Content-Type para que Angular lo detecte si es FormData
    });
    const formData = this.buildFormData(proyecto);
    return this.http.post<Proyecto>(this.apiUrl, formData, { headers });
  }

  actualizarProyecto(id: number, proyecto: Proyecto): Observable<Proyecto> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const formData = this.buildFormData(proyecto);
    return this.http.put<Proyecto>(`${this.apiUrl}${id}/`, formData, { headers });
  }

  eliminarProyecto(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }

  private buildFormData(proyecto: Proyecto): FormData {
    const formData = new FormData();

    // No agregar usuario si lo maneja backend automáticamente

    formData.append('titulo', proyecto.titulo);
    formData.append('descripcion', proyecto.descripcion);

    if (proyecto.demo_url) {
      formData.append('demo_url', proyecto.demo_url);
    }
    if (proyecto.codigo_url) {
      formData.append('codigo_url', proyecto.codigo_url);
    }

    if (proyecto.imagen instanceof File) {
      formData.append('imagen', proyecto.imagen);
    }
    // Si es string (URL), usualmente no se reenvía la imagen en FormData

    // Agregar ids de tecnologías — verifica que `tecnologias` exista y tenga id
    proyecto.tecnologias.forEach(tec => {
      if (tec.id) {
        formData.append('tecnologias_ids', tec.id.toString());
      }
    });

    return formData;
  }
}
