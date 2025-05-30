import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-order',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-order.component.html',
  styleUrl: './navbar-order.component.css'
})
export class NavbarOrderComponent {
  isMenuOpen = false;

  // Method to toggle mobile menu visibility
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
