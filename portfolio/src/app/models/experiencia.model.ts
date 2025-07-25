export interface Experiencia {
  id?: number;
  user?: number; // opcional si ya se maneja desde backend
  puesto: string;
  empresa: string;
  fecha: string;
  logo?: string; // URL o base64 si se quiere mostrar la imagen
}
