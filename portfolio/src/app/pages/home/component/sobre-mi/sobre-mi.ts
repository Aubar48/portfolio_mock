import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Perfil } from '../../../../models/perfil.model';
import { PerfilService } from '../../../../service/perfil/perfil.service';
import { Tecnologia } from '../../../../models/tecnologia.model';
import { TecnologiaService } from '../../../../service/tecnologia/tecnologia.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.html',
})
export class SobreMi implements OnInit {
  perfiles: Perfil[] = [];
  perfil?: Perfil;
  tecnologias: Tecnologia[] = [];  // <-- acá la lista de tecnologías

  form: FormGroup;
  editando: boolean = false;
  perfilActualId?: number;
  imagenPreview: string | ArrayBuffer | null = null;
  archivoImagen: File | null = null;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private tecnologiaService: TecnologiaService,  // <-- inyectar servicio tecnologías
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      sobre_mi: [''],
      imagen: [''],
      linkedin: [''],
      github: [''],
    });
  }

  ngOnInit(): void {
    this.cargarPerfiles();
    this.cargarTecnologias();  // <-- cargar tecnologías al iniciar
  }

  cargarPerfiles(): void {
    this.perfilService.obtenerPerfiles().subscribe({
      next: (res) => {
        this.perfiles = [...res];
        if (this.perfiles.length > 0) {
          this.perfil = this.perfiles[0];
          this.editando = true;
          this.perfilActualId = this.perfil.id;

          this.form.patchValue({
            nombre: this.perfil.nombre,
            titulo: this.perfil.titulo,
            descripcion: this.perfil.descripcion,
            sobre_mi: this.perfil.sobre_mi,
            imagen: this.perfil.imagen,
            linkedin: this.perfil.linkedin,
            github: this.perfil.github,
          });

          this.imagenPreview = this.perfil.imagen || null;
          this.archivoImagen = null;
        } else {
          this.perfil = undefined;
          this.editando = false;
          this.perfilActualId = undefined;
          this.form.reset();
          this.imagenPreview = null;
          this.archivoImagen = null;
        }
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener perfiles:', err);
        alert(`Error: ${err.status} - ${err.message}`);
      }
    });
  }

  cargarTecnologias(): void {
    this.tecnologiaService.obtenerTecnologias().subscribe({
      next: (res) => {
        this.tecnologias = [...res];
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener tecnologías:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoImagen = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(this.archivoImagen);
    } else {
      this.archivoImagen = null;
      this.imagenPreview = null;
    }
  }

  enviarFormulario(): void {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('nombre', this.form.value.nombre);
    formData.append('titulo', this.form.value.titulo);
    formData.append('descripcion', this.form.value.descripcion);
    formData.append('sobre_mi', this.form.value.sobre_mi);
    formData.append('linkedin', this.form.value.linkedin);
    formData.append('github', this.form.value.github);

    if (this.archivoImagen) {
      formData.append('imagen', this.archivoImagen);
    }

    if (this.editando && this.perfilActualId) {
      this.perfilService.actualizarPerfil(this.perfilActualId, formData).subscribe({
        next: () => {
          this.cargarPerfiles();
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('Error al actualizar', err);
          alert(`Error al actualizar: ${err.status} - ${err.message}`);
        }
      });
    } else {
      this.perfilService.crearPerfil(formData).subscribe({
        next: () => {
          this.cargarPerfiles();
          this.form.reset();
          this.imagenPreview = null;
          this.archivoImagen = null;
        },
        error: (err) => {
          console.error('Error al crear', err);
          alert(`Error al crear: ${err.status} - ${err.message}`);
        }
      });
    }
  }

  editarPerfil(perfil: Perfil): void {
    this.perfil = perfil;
    this.editando = true;
    this.perfilActualId = perfil.id;

    this.form.patchValue({
      nombre: perfil.nombre,
      titulo: perfil.titulo,
      descripcion: perfil.descripcion,
      sobre_mi: perfil.sobre_mi,
      imagen: perfil.imagen,
      linkedin: perfil.linkedin,
      github: perfil.github,
    });

    this.imagenPreview = perfil.imagen || null;
    this.archivoImagen = null;
  }

  eliminarPerfil(id: number): void {
    if (confirm('¿Estás seguro de eliminar este perfil?')) {
      this.perfilService.eliminarPerfil(id).subscribe({
        next: () => this.cargarPerfiles(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.perfil = undefined;
    this.perfilActualId = undefined;
    this.form.reset();
    this.imagenPreview = null;
    this.archivoImagen = null;
  }
}
