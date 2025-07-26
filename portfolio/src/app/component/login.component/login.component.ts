import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() switchToRecovery = new EventEmitter<void>();

  loginForm: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        console.log('Login exitoso, token:', res.access);

        // Guardar el token en localStorage o donde prefieras
        localStorage.setItem('access_token', res.access);

        // Redirigir al dashboard
        window.location.href = '/dashboard'; //siempre usa windows location nahuel

      },
      error: (err) => {
        this.loading = false;
        this.error = 'Usuario o contraseña incorrectos.';
        console.error('Error de login:', err);
      }
    });
  }

  changeToRecovery(): void {
    this.switchToRecovery.emit();
  }

  changeToRegister(): void {
    this.switchToRegister.emit();
  }
}
