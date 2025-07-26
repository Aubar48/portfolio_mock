import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { RegisterRequest } from '../../models/register';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() switchToLogin = new EventEmitter<void>();

  registerForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      const user: RegisterRequest = { username, password };

      this.authService.register(user).subscribe({
        next: res => {
          console.log('Usuario registrado:', res);
          this.error = null;
        },
        error: err => {
          console.error('Error en registro:', err);
          this.error = 'Hubo un error al registrarse. Intentá de nuevo.';
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  changeToLogin(): void {
    this.switchToLogin.emit();
  }
}
