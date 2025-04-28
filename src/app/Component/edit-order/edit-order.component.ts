import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  standalone: true, 
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
  imports: [CommonModule, FormsModule  ,] // ✅ Add necessary imports
})
export class EditOrderComponent {
  orderItems = [
    { name: 'K:Shorts W only', quantity: 1, driverUpdate: true },
    { name: 'Jacket Wash and Dry', quantity: 1, driverUpdate: false },
    { name: 'Kids: T Shirt Wash', quantity: 2, driverUpdate: true }
  ];

  totalItems() {
    return this.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  totalConfirmedItems() {
    return this.orderItems.reduce((sum, item) => sum + (item.driverUpdate ? item.quantity : 0), 0);
  }

  constructor(private router: Router) {}

  goBack() {
    console.log('Navigating back');
    this.router.navigate(['pickups-pending-order-details']);
  }

  saveOrder() {
    console.log('Order saved', this.orderItems);
  }
}
