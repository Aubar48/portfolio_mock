export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword?: string; // Solo para frontend, no se envía al backend
}
