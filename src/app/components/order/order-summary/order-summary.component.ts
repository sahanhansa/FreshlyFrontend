import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
  id: number;
  name: string;
  material: string;
  washMethod: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  @Input() orderId: string = '';
  @Input() laundryName: string = '';
  @Input() items: OrderItem[] = [];
  @Input() showLaundryInfo: boolean = true;

  orderItems: OrderItem[] = [];

  ngOnInit() {
    // Use the provided items or fallback to default
    this.orderItems = this.items;
  }

  get total(): number {
    return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  editOrder() {
    console.log(`Edit order: ${this.orderId}`);
  }

  deleteOrder() {
    console.log(`Delete order: ${this.orderId}`);
  }

  placeOrder() {
    console.log(`Place order: ${this.orderId}`);
  }

  deleteItem(itemId: number) {
    const index = this.orderItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.orderItems.splice(index, 1);
      console.log(`Item with ID ${itemId} removed from order ${this.orderId}`);
    }
  }
}
