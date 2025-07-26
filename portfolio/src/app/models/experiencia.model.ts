export interface Experiencia {
  id?: number;
  user?: number; // opcional si el backend asigna el usuario automáticamente
  puesto: string;
  empresa: string;
  fecha: string;
  logo?: string | File | null; // Para contemplar carga de archivo o url
}
