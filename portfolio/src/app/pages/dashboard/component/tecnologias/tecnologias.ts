import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TecnologiaService } from '../../../../service/tecnologia/tecnologia.service';
import { Tecnologia } from '../../../../models/tecnologia.model';

@Component({
  standalone: true,
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class TecnologiasComponent implements OnInit {
  tecnologias: Tecnologia[] = [];
  form: FormGroup;
  editando: boolean = false;
  tecnologiaActualId?: number;

  constructor(
    private fb: FormBuilder,
    private tecnologiaService: TecnologiaService,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      icono: ['', Validators.required],
      publicado: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarTecnologias();
  }

  cargarTecnologias(): void {
    this.tecnologiaService.obtenerTecnologias().subscribe({
      next: (res) => {
        this.tecnologias = [...res];
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar tecnologías:', err);
      }
    });
  }

  enviarFormulario(): void {
    if (this.form.invalid) return;

    const datos = this.form.value;

    if (this.editando && this.tecnologiaActualId) {
      this.tecnologiaService.actualizarTecnologia(this.tecnologiaActualId, datos).subscribe({
        next: () => {
          this.cargarTecnologias();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar tecnología:', err)
      });
    } else {
      this.tecnologiaService.crearTecnologia(datos).subscribe({
        next: () => {
          this.cargarTecnologias();
          this.form.reset();
        },
        error: (err) => console.error('Error al crear tecnología:', err)
      });
    }
  }

  editarTecnologia(tecnologia: Tecnologia): void {
    this.editando = true;
    this.tecnologiaActualId = tecnologia.id;
    this.form.patchValue({
      nombre: tecnologia.nombre,
      icono: tecnologia.icono,
      publicado: tecnologia.publicado,
    });
  }

  eliminarTecnologia(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tecnología?')) {
      this.tecnologiaService.eliminarTecnologia(id).subscribe({
        next: () => this.cargarTecnologias(),
        error: (err) => console.error('Error al eliminar tecnología:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.tecnologiaActualId = undefined;
    this.form.reset();
  }
}
