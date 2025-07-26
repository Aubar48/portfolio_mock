import { Component } from '@angular/core';
import { SobreMiComponent } from './component/sobre-mi/sobre-mi';
import { EducacionComponent } from './component/educacion/educacion';
import { ExperienciaComponent } from './component/experiencia/experiencia';
import { Proyectos } from './component/proyectos/proyectos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule, SobreMiComponent, EducacionComponent, ExperienciaComponent, Proyectos],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
