export interface Tecnologia {
  id?: number;           // ← opcional para cuando creás nuevas
  nombre: string;
  icono: string;
  user: number;          // ID del usuario (ForeignKey en Django)
}
