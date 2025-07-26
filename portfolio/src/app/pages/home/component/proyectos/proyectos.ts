import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../../models/proyecto.model';
import { ProyectoService } from '../../../../service/proyecto/proyecto.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class Proyectos implements OnInit {
  proyectos: Proyecto[] = [];
  cargando: boolean = false;
  error: string | null = null;

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.cargando = true;
    this.error = null;

    this.proyectoService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando proyectos', err);
        this.error = 'No se pudieron cargar los proyectos.';
        this.cargando = false;
      }
    });
  }
}
