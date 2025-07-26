import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Error 401 = No autorizado
        if (error.status === 401) {
          this.authService.logout();  // opcional: limpiar token
          this.router.navigate(['/login']);
        }

        // Podés manejar otros errores también:
        if (error.status === 403) {
          console.warn('Acceso prohibido.');
        }

        if (error.status === 500) {
          console.error('Error del servidor.');
        }

        // Siempre propaga el error para que otros lo puedan manejar si quieren
        return throwError(() => error);
      })
    );
  }
}
