import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Order {
  trackingId: string;
  customer: string;
  date: string;
  orderId: string;
  paymentMethod: string;
  action: 'Delivered' | 'Picked';
}

@Component({
  selector: 'app-complete-order-list',
  imports: [CommonModule],
  templateUrl: './complete-order-list.component.html',
  styleUrl: './complete-order-list.component.scss'
})
export class CompleteOrderListComponent {
   orders: Order[] = [
    {
      trackingId: '#4621',
      customer: 'Matt Dickerson',
      date: '2025-07-10',
      orderId: '#4621',
      paymentMethod: 'Cash on Delivery',
      action: 'Delivered'
    },
    {
      trackingId: '#0998',
      customer: 'Wiktoria',
      date: '2025-07-10',
      orderId: '#0998',
      paymentMethod: 'Bank Transfer',
      action: 'Delivered'
    },
    {
      trackingId: '#3762',
      customer: 'Trixie Byrd',
      date: '2025-07-10',
      orderId: '#3762',
      paymentMethod: 'Cash on Delivery',
      action: 'Picked'
    },
    {
      trackingId: '#6689',
      customer: 'Brad Mason',
      date: '2025-07-10',
      orderId: '#6689',
      paymentMethod: 'Cash on Delivery',
      action: 'Delivered'
    },
    {
      trackingId: '#5690',
      customer: 'Sanderson',
      date: '2025-07-10',
      orderId: '#5690',
      paymentMethod: 'Cash on Delivery',
      action: 'Picked'
    },
    {
      trackingId: '#4811',
      customer: 'Jun Redfern',
      date: '2025-07-10',
      orderId: '#4811',
      paymentMethod: 'Bank Transfer',
      action: 'Delivered'
    },
    {
      trackingId: '#7046',
      customer: 'Miriam Kidd',
      date: '2025-07-10',
      orderId: '#7046',
      paymentMethod: 'Cash on Delivery',
      action: 'Picked'
    },
    {
      trackingId: '#1265',
      customer: 'Dominic',
      date: '2025-07-10',
      orderId: '#1265',
      paymentMethod: 'Bank Transfer',
      action: 'Delivered'
    },
    {
      trackingId: '#6800',
      customer: 'Shanice',
      date: '2025-07-10',
      orderId: '#6800',
      paymentMethod: 'Cash on Delivery',
      action: 'Picked'
    }
  ];

  paginatedOrders: Order[] = [];

  constructor() {
    // For now, show all orders (pagination can be added later)
    this.paginatedOrders = this.orders;
  }
  openSummary(order: Order) {
    console.log('Order summary clicked:', order);
    // 👉 Replace with your modal or navigation logic
  }
}