import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Educacion } from '../../../../models/educacion.model';
import { EducacionService } from '../../../../service/educacion/educacion.service';

@Component({
  selector: 'app-educacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './educacion.html',
  styleUrl: './educacion.css'
})
export class EducacionComponent implements OnInit {

  educaciones: Educacion[] = [];

  constructor(private educacionService: EducacionService) {}

  ngOnInit(): void {
    this.cargarEducaciones();
  }

  cargarEducaciones(): void {
    this.educacionService.getEducaciones().subscribe({
      next: (data) => {
        this.educaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener educaciones:', err);
      }
    });
  }
}
