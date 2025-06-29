import { Component } from '@angular/core';
import { Header } from "../../component/header/header";
import { SobreMi } from './component/sobre-mi/sobre-mi';
import { Educacion } from './component/educacion/educacion';
import { Experiencia } from './component/experiencia/experiencia';
import { Proyectos } from './component/proyectos/proyectos';

@Component({
  selector: 'app-dashboard',
  imports: [SobreMi, Educacion, Experiencia, Proyectos, Header,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
