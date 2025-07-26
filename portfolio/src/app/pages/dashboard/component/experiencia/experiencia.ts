import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from '../../../../models/experiencia.model';
import { ExperienciaService } from '../../../../service/experiencia/experiencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './experiencia.html',
  styleUrls: ['./experiencia.css']
})
export class ExperienciaComponent implements OnInit {
  experiencias: Experiencia[] = [];
  form: FormGroup;
  editando: boolean = false;
  experienciaActualId?: number;
  logoPreview: string | ArrayBuffer | null = null;
  archivoLogo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private experienciaService: ExperienciaService,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      fecha: ['', Validators.required],
      logo: [''] // para compatibilidad con url o archivo
    });
  }

  ngOnInit(): void {
    this.cargarExperiencias();
  }

  cargarExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe({
      next: res => {
        this.experiencias = res;
        this.cdRef.detectChanges();
      },
      error: err => console.error('Error al cargar experiencias', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoLogo = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.logoPreview = reader.result;
      reader.readAsDataURL(this.archivoLogo);
    } else {
      this.archivoLogo = null;
      this.logoPreview = null;
    }
  }

  enviarFormulario(): void {
    if (this.form.invalid) return;

    const exp: Experiencia = {
      puesto: this.form.value.puesto,
      empresa: this.form.value.empresa,
      fecha: this.form.value.fecha,
      logo: this.archivoLogo || this.form.value.logo
    };

    if (this.editando && this.experienciaActualId) {
      this.experienciaService.actualizarExperiencia(this.experienciaActualId, exp).subscribe({
        next: () => {
          this.cargarExperiencias();
          this.cancelarEdicion();
        },
        error: err => console.error('Error al actualizar experiencia', err)
      });
    } else {
      this.experienciaService.crearExperiencia(exp).subscribe({
        next: () => {
          this.cargarExperiencias();
          this.form.reset();
          this.logoPreview = null;
          this.archivoLogo = null;
        },
        error: err => console.error('Error al crear experiencia', err)
      });
    }
  }

  editarExperiencia(exp: Experiencia): void {
    this.editando = true;
    this.experienciaActualId = exp.id;

    this.form.patchValue({
      puesto: exp.puesto,
      empresa: exp.empresa,
      fecha: exp.fecha,
      logo: exp.logo
    });

    this.logoPreview = typeof exp.logo === 'string' ? exp.logo : null;
    this.archivoLogo = null;
  }

  eliminarExperiencia(id: number): void {
    if (confirm('¿Seguro querés eliminar esta experiencia?')) {
      this.experienciaService.eliminarExperiencia(id).subscribe({
        next: () => this.cargarExperiencias(),
        error: err => console.error('Error al eliminar experiencia', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.experienciaActualId = undefined;
    this.form.reset();
    this.logoPreview = null;
    this.archivoLogo = null;
  }
}
