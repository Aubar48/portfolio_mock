import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/']);
    return of(false); // ← Mejor usar observable para mantener consistencia
  }

  return authService.isLoggedIn().pipe(
    take(1),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
