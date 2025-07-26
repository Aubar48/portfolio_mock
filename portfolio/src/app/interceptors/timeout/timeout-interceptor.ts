// timeout.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable, TimeoutError, throwError, timeout, catchError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(10000), // 10 segundos
      catchError(err => {
        if (err instanceof TimeoutError) {
          console.error('⏰ Request timeout!');
        }
        return throwError(() => err);
      })
    );
  }
}
