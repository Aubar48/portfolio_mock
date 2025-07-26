import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proyecto } from '../../../../models/proyecto.model';
import { Tecnologia } from '../../../../models/tecnologia.model';
import { ProyectoService } from '../../../../service/proyecto/proyecto.service';
import { TecnologiaService } from '../../../../service/tecnologia/tecnologia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];
  tecnologias: Tecnologia[] = [];
  form: FormGroup;
  editando: boolean = false;
  proyectoActualId?: number;
  imagenPreview: string | ArrayBuffer | null = null;
  archivoImagen: File | null = null;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private tecnologiaService: TecnologiaService,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      demo_url: [''],
      codigo_url: [''],
      imagen: [''], // solo para compatibilidad, no se usa para subir archivo
      tecnologias: [[], Validators.required] // array de objetos Tecnologia o ids
    });
  }

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarTecnologias();
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe({
      next: res => {
        this.proyectos = res;
        this.cdRef.detectChanges();
      },
      error: err => console.error('Error al cargar proyectos', err)
    });
  }

  cargarTecnologias(): void {
    this.tecnologiaService.obtenerTecnologias().subscribe({
      next: res => {
        this.tecnologias = res;
      },
      error: err => console.error('Error al cargar tecnologías', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
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

  const proyecto: Proyecto = {
    usuario: 1,
    titulo: this.form.value.titulo,
    descripcion: this.form.value.descripcion,
    demo_url: this.form.value.demo_url,
    codigo_url: this.form.value.codigo_url,
    tecnologias: this.form.value.tecnologias,
    imagen: this.archivoImagen ? this.archivoImagen : undefined,  // solo archivo si existe
  };

  if (this.editando && this.proyectoActualId) {
    this.proyectoService.actualizarProyecto(this.proyectoActualId, proyecto).subscribe({
      next: () => {
        this.cargarProyectos();
        this.cancelarEdicion();
      },
      error: (err: any) => console.error('Error al actualizar proyecto', err)
    });
  } else {
    this.proyectoService.crearProyecto(proyecto).subscribe({
      next: () => {
        this.cargarProyectos();
        this.form.reset();
        this.imagenPreview = null;
        this.archivoImagen = null;
      },
      error: (err: any) => console.error('Error al crear proyecto', err)
    });
  }
}

  editarProyecto(proyecto: Proyecto): void {
    this.editando = true;
    this.proyectoActualId = proyecto.id;

    this.form.patchValue({
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      demo_url: proyecto.demo_url,
      codigo_url: proyecto.codigo_url,
      tecnologias: proyecto.tecnologias,
      imagen: proyecto.imagen
    });

    this.imagenPreview = typeof proyecto.imagen === 'string' ? proyecto.imagen : null;
    this.archivoImagen = null;
  }

  getNombresTecnologias(tecnologias: Tecnologia[] | undefined): string {
    if (!tecnologias) return '';
    return tecnologias.map(t => t.nombre).join(', ');
  }

  eliminarProyecto(id: number): void {
    if (confirm('¿Seguro querés eliminar este proyecto?')) {
      this.proyectoService.eliminarProyecto(id).subscribe({
        next: () => this.cargarProyectos(),
        error: err => console.error('Error al eliminar proyecto', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.proyectoActualId = undefined;
    this.form.reset();
    this.imagenPreview = null;
    this.archivoImagen = null;
  }
}
