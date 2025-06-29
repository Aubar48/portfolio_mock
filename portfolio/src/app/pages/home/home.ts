import { Component } from '@angular/core';
import { SobreMi } from './component/sobre-mi/sobre-mi';
import { Educacion } from './component/educacion/educacion';
import { Experiencia } from './component/experiencia/experiencia';
import { Proyectos } from './component/proyectos/proyectos';

@Component({
  selector: 'app-home',
  imports: [SobreMi, Educacion, Experiencia, Proyectos,],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
