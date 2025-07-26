import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experiencia } from '../../../../models/experiencia.model';
import { ExperienciaService } from '../../../../service/experiencia/experiencia.service';

@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiencia.html',
  styleUrl: './experiencia.css'
})
export class ExperienciaComponent implements OnInit {

  experiencias: Experiencia[] = [];

  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.cargarExperiencias();
  }

  cargarExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe({
      next: (data) => {
        this.experiencias = data;
      },
      error: (err) => {
        console.error('Error al obtener experiencias:', err);
      }
    });
  }
}
