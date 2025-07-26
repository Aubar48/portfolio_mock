import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
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
    const formData = this.buildFormData(proyecto);
    return this.http.post<Proyecto>(this.apiUrl, formData);
  }

  actualizarProyecto(id: number, proyecto: Proyecto): Observable<Proyecto> {
    const formData = this.buildFormData(proyecto);
    return this.http.put<Proyecto>(`${this.apiUrl}${id}/`, formData);
  }

  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  private buildFormData(proyecto: Proyecto): FormData {
    const formData = new FormData();

    // No agregamos usuario si lo manejás en backend automáticamente (recomendado)
    // formData.append('usuario', proyecto.usuario.toString());

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
    } else if (typeof proyecto.imagen === 'string') {
      // Si la imagen es URL (string), depende si quieres enviar o no,
      // usualmente no se reenvía en multipart/formdata
    }

    // Agregar IDs de tecnologías
    proyecto.tecnologias.forEach(tec => {
      // El backend espera 'tecnologias_ids' (según serializer)
      formData.append('tecnologias_ids', tec.id!.toString());
    });

    return formData;
  }
}
