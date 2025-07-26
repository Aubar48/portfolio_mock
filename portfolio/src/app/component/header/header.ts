import {
  Component,
  Renderer2,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { LoginComponent } from "../login.component/login.component";
import { RegisterComponent } from '../register.component/register.component';
import { AuthService } from './../../service/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isLoggedIn: boolean = false;
  darkMode = false;
  authMode: 'login' | 'register' = 'register';
  private authSub!: Subscription;

  @ViewChild('scrollBtn', { static: false }) scrollBtnRef!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.darkMode = savedTheme === 'dark';
      this.setTheme(this.darkMode ? 'dark' : 'light');

      // Suscribirse al estado de login desde el servicio
      this.authSub = this.authService.isLoggedIn().subscribe(status => {
        this.isLoggedIn = status;
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.onscroll = () => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
        const btn = this.scrollBtnRef?.nativeElement;
        if (!btn) return;
        if (scroll > 100) {
          this.renderer.setStyle(btn, 'display', 'block');
        } else {
          this.renderer.setStyle(btn, 'display', 'none');
        }
      };
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    const theme = this.darkMode ? 'dark' : 'light';
    this.setTheme(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }

  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(document.body, 'data-bs-theme', theme);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

 // Para cambiar entre login y registro desde los botones del modal
  onSwitchToLogin(): void {
    this.authMode = 'login';
  }

  onSwitchToRegister(): void {
    this.authMode = 'register';
  }
  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  goToDashboard() {
  window.location.href = '/dashboard';
}
 goToHome() {
  window.location.href = '/';
}

handleKey(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); // Evita el scroll al presionar Space
    this.goToHome();
  }
}

}
