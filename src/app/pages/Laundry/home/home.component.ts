import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() laundryName: string = 'Sparkle';
  constructor(private router: Router) {}

  goToNewOrder() {
    this.router.navigate(['/laundry/new-orders']);
  }
  
  goToProcessingOrders() {
    this.router.navigate(['/laundry/confirm-orders']);
  }
}
