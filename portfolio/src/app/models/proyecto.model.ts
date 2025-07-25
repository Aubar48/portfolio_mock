import { Tecnologia } from './tecnologia.model';

export interface Proyecto {
  id?: number; // se incluye opcionalmente para identificar proyectos existentes
  usuario: number; // ID del usuario relacionado
  titulo: string;
  descripcion: string;
  imagen?: string; // puede ser una URL o base64 en el futuro
  demo_url?: string;
  codigo_url?: string;
  tecnologias: Tecnologia[]; // array de tecnologías asociadas
}
