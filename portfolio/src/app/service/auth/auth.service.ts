import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    if (this.canUseLocalStorage()) {
      const hasToken = !!localStorage.getItem('access_token');
      this.isAuthenticatedSubject.next(hasToken);
    }
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}token/`, credentials).pipe(
      tap((response: any) => {
        if (this.canUseLocalStorage() && response.access) {
          localStorage.setItem('access_token', response.access);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData);
  }

  logout(): void {
    if (this.canUseLocalStorage()) {
      localStorage.removeItem('access_token');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return this.canUseLocalStorage() ? localStorage.getItem('access_token') : null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}perfil/`, {
      headers: this.getAuthHeaders()
    });
  }

  private canUseLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
