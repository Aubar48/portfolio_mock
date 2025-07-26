import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Educacion } from '../../../../models/educacion.model';
import { EducacionService } from '../../../../service/educacion/educacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-educacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './educacion.html',
  styleUrls: ['./educacion.css']
})
export class EducacionComponent implements OnInit {
  educaciones: Educacion[] = [];
  form: FormGroup;
  editando: boolean = false;
  educacionActualId?: number;
  logoPreview: string | ArrayBuffer | null = null;
  archivoLogo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private educacionService: EducacionService,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      institucion: ['', Validators.required],
      fecha: ['', Validators.required],
      logo: ['']  // Para compatibilidad, aunque carguemos archivo separado
    });
  }

  ngOnInit(): void {
    this.cargarEducaciones();
  }

  cargarEducaciones(): void {
    this.educacionService.getEducaciones().subscribe({
      next: (res) => {
        this.educaciones = res;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error al cargar educaciones', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoLogo = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(this.archivoLogo);
    } else {
      this.archivoLogo = null;
      this.logoPreview = null;
    }
  }

  enviarFormulario(): void {
    if (this.form.invalid) return;

    const educacion: Educacion = {
      titulo: this.form.value.titulo,
      institucion: this.form.value.institucion,
      fecha: this.form.value.fecha,
      logo: this.archivoLogo || this.form.value.logo
    };

    if (this.editando && this.educacionActualId) {
      this.educacionService.actualizarEducacion(this.educacionActualId, educacion).subscribe({
        next: () => {
          this.cargarEducaciones();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar educación', err)
      });
    } else {
      this.educacionService.crearEducacion(educacion).subscribe({
        next: () => {
          this.cargarEducaciones();
          this.form.reset();
          this.logoPreview = null;
          this.archivoLogo = null;
        },
        error: (err) => console.error('Error al crear educación', err)
      });
    }
  }

  editarEducacion(educacion: Educacion): void {
    this.editando = true;
    this.educacionActualId = educacion.id;

    this.form.patchValue({
      titulo: educacion.titulo,
      institucion: educacion.institucion,
      fecha: educacion.fecha,
      logo: educacion.logo
    });

    this.logoPreview = educacion.logo || null;
    this.archivoLogo = null;
  }

  eliminarEducacion(id: number): void {
    if (confirm('¿Seguro querés eliminar esta educación?')) {
      this.educacionService.eliminarEducacion(id).subscribe({
        next: () => this.cargarEducaciones(),
        error: (err) => console.error('Error al eliminar educación', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.educacionActualId = undefined;
    this.form.reset();
    this.logoPreview = null;
    this.archivoLogo = null;
  }
}
