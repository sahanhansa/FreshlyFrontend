import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-pay-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-pay-order-card.component.html',
  styleUrl: './to-pay-order-card.component.css'
})
export class ToPayOrderCardComponent {
  @Input() orderId: string = '';
  @Input() laundryName: string = '';
  @Input() date: string = '';
  @Input() totalAmount: number = 0;
  @Input() items: { name: string, quantity: number }[] = [];
  
  @Output() payNow = new EventEmitter<string>();
  
  onPayClick(): void {
    this.payNow.emit(this.orderId);
  }
  
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}
