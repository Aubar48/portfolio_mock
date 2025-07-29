import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports:[CommonModule],
  selector: 'app-accessibility',
  templateUrl: './accessibility.html',
  styleUrls: ['./accessibility.css']
})
export class AccessibilityComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleContrast() {
    document.body.classList.toggle('high-contrast');
  }

  toggleLargeText() {
    document.body.classList.toggle('large-text');
  }

  toggleHideImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => img.classList.toggle('hide-image'));
  }

  resetAccessibility() {
    document.body.classList.remove('high-contrast', 'large-text');
    document.querySelectorAll('img').forEach(img => img.classList.remove('hide-image'));
  }
}
