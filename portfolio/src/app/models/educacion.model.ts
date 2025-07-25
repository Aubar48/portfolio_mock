export interface Educacion {
  id?: number;
  user?: number; // si lo necesitas mostrar
  titulo: string;
  institucion: string;
  fecha: string;
  logo?: string; // puede ser una URL o base64
}
