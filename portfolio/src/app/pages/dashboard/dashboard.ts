import { Component } from '@angular/core';
import { SobreMi } from './component/sobre-mi/sobre-mi';
import { EducacionComponent } from './component/educacion/educacion';
import { ExperienciaComponent } from './component/experiencia/experiencia';
import { ProyectosComponent } from './component/proyectos/proyectos';
import { CommonModule } from '@angular/common';
import { TecnologiasComponent } from "./component/tecnologias/tecnologias";

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule, SobreMi, EducacionComponent, ExperienciaComponent, ProyectosComponent,TecnologiasComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

   seccion: string = 'sobre-mi';

  cambiarSeccion(nombre: string) {
    this.seccion = nombre;
  }
}
