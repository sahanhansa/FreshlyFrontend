import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusStep } from '../order-status/order-status.component';

// Define the structure for order items displayed in the card
interface OrderItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})

export class OrderCardComponent {
  @Input() orderId: string = '';
  @Input() laundryName: string = '';
  @Input() date: string = '';
  @Input() items: OrderItem[] = [];
  @Input() totalAmount: number = 0;
  @Input() status: 'ongoing' | 'completed' = 'ongoing';
  @Input() currentStep: OrderStatusStep = 'Order placed';
  
  @Output() orderClicked = new EventEmitter<string>();
  
  // Method that emits the order ID when the card is clicked
  viewOrderDetails(): void {
    this.orderClicked.emit(this.orderId);
  }
  
  // Helper method to check if the order is currently in progress
  isOngoing(): boolean {
    return this.status === 'ongoing';
  }
  
  // Helper method to check if the order is completed
  isCompleted(): boolean {
    return this.status === 'completed' || this.currentStep === 'Completed';
  }
}