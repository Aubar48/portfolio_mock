import { Component, Renderer2, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  darkMode = false;

  @ViewChild('scrollBtn') scrollBtnRef!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.darkMode = savedTheme === 'dark';
      this.setTheme(this.darkMode ? 'dark' : 'light');
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
}
