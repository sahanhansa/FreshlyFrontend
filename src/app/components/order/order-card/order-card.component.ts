import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Input() status: 'processing' | 'ready' | 'delivered' | 'cancelled' = 'processing';
  
  @Output() orderClicked = new EventEmitter<string>();
  
  viewOrderDetails(): void {
    this.orderClicked.emit(this.orderId);
  }
}