import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-navbar-order',
  standalone: true,
  templateUrl: './navbar-order.component.html',
  styleUrls: ['./navbar-order.component.css'],
})
export class NavbarOrderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
