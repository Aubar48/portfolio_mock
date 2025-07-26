import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header';
import { Footer } from './component/footer/footer';
import { Carrousel } from './component/carrousel/carrousel';
import { Spotify } from './component/spotify/spotify';
import { LoaderComponent } from './component/loader/loader';
import { CommonModule } from '@angular/common';
import { LoadingService } from './service/loading/loading.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    Footer,
    Carrousel,
    Spotify,
    LoaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'portfolio';
  loading = false;
  private loadingService = inject(LoadingService);

  ngOnInit() {
    this.loadingService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }
}
