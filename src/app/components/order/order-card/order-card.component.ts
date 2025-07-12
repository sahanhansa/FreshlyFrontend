import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusStep } from '../order-status/order-status.component';

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
  
  viewOrderDetails(): void {
    this.orderClicked.emit(this.orderId);
  }
  
  isOngoing(): boolean {
    return this.status === 'ongoing';
  }
  
  isCompleted(): boolean {
    return this.status === 'completed' || this.currentStep === 'Completed';
  }
}