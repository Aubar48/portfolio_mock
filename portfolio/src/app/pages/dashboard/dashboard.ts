import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header";
import { SobreMi } from './component/sobre-mi/sobre-mi';
import { Educacion } from './component/educacion/educacion';
import { Experiencia } from './component/experiencia/experiencia';
import { Proyectos } from './component/proyectos/proyectos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule,SobreMi, Educacion, Experiencia, Proyectos, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
