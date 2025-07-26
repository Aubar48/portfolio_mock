import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../../../service/perfil/perfil.service';
import { TecnologiaService } from '../../../../service/tecnologia/tecnologia.service';
import { Perfil } from '../../../../models/perfil.model';
import { Tecnologia } from '../../../../models/tecnologia.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-mi.html',
  styleUrls: ['./sobre-mi.css']
})
export class SobreMiComponent implements OnInit {
  perfil?: Perfil;
  tecnologias: Tecnologia[] = [];
  perfilId = 1; // O cambiarlo dinámicamente según usuario autenticado

  constructor(
    private perfilService: PerfilService,
    private tecnologiaService: TecnologiaService
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarTecnologias();
  }

  cargarPerfil(): void {
    this.perfilService.obtenerPerfil(this.perfilId).subscribe({
      next: (data) => this.perfil = data,
      error: (err) => console.error('Error al cargar perfil', err)
    });
  }

  cargarTecnologias(): void {
    this.tecnologiaService.obtenerTecnologias().subscribe({
      next: (data) => this.tecnologias = data.filter(t => t.publicado),
      error: (err) => console.error('Error al cargar tecnologías', err)
    });
  }
}
