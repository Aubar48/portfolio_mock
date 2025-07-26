import { Tecnologia } from './tecnologia.model';

export interface Proyecto {
  id?: number;
  usuario: number;
  titulo: string;
  descripcion: string;
  imagen?: string | File;  // <-- puede ser URL o archivo
  demo_url?: string;
  codigo_url?: string;
  tecnologias: Tecnologia[];
}
