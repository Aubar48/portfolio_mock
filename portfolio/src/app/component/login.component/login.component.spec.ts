import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent], // porque es standalone
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si no se completa', () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('debería llamar al método login del servicio si el formulario es válido', () => {
    const mockResponse = of({});
    authServiceSpy.login.and.returnValue(mockResponse);

    component.loginForm.setValue({ username: 'aubar', password: 'aubar' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ username: 'aubar', password: 'aubar' });
  });

  it('debería mostrar un error si el login falla', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.loginForm.setValue({ username: 'wrong', password: 'wrong' });
    component.onSubmit();

    expect(component.error).toBe('Usuario o contraseña incorrectos.');
  });
});
