// loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './../../service/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private LoadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.LoadingService.show();
    return next.handle(req).pipe(
      finalize(() => this.LoadingService.hide())
    );
  }
}
