import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-order-card.component.html',
  styleUrl: './completed-order-card.component.css'
})
export class CompletedOrderCardComponent {
  @Input() orderId: string = '';
  @Input() laundryName: string = '';
  @Input() date: string = '';
  @Input() totalAmount: number = 0;
  @Input() items: { name: string, quantity: number }[] = [];
  
  @Output() rateOrder = new EventEmitter<string>();
  
  onRateClick(): void {
    this.rateOrder.emit(this.orderId);
  }
  
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}
