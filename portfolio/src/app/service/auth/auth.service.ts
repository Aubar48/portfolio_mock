import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/token/`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // Login
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // Registro
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  // Saber si hay token
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener headers con token para usar en otros servicios
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Podés agregar métodos para obtener el perfil, etc.
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/`, {
      headers: this.getAuthHeaders()
    });
  }
}
