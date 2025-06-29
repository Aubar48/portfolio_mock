import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./component/header/header";
import { Footer } from "./component/footer/footer";
import { Carrousel } from "./component/carrousel/carrousel";
import { Spotify } from "./component/spotify/spotify";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Carrousel, Spotify],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'portfolio';
}
