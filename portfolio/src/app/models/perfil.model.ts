export interface Usuario {
  id: number;
  username: string;
  email: string;
}

export interface Perfil {
  id: number;
  user: Usuario;
  nombre: string;
  titulo: string;
  descripcion: string;
  sobre_mi?: string | null;
  imagen?: string | null;
  linkedin?: string | null;
  github?: string | null;
}
