import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../order-card/order-card.component';
import { OrderStatusStep } from '../order-status/order-status.component';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  laundryName: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'completed';  // Changed to 'completed'
  currentStep: 'Completed'; // All past orders are in the completed state
}

@Component({
  selector: 'app-past-order-list',
  standalone: true,
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './past-order-list.component.html',
  styleUrl: './past-order-list.component.css'
})
export class PastOrderListComponent {
  // Sample data - only containing completed orders
  pastOrders: Order[] = [
    {
      id: '456118',
      laundryName: 'Laundry 2, Nugegoda',
      date: '25 February 2025',
      items: [
        { name: 'Shirt', quantity: 3 },
        { name: 'Trouser', quantity: 2 },
        { name: 'Dress', quantity: 1 }
      ],
      totalAmount: 2750,
      status: 'completed',
      currentStep: 'Completed'
    },
    {
      id: '456115',
      laundryName: 'Laundry 5, Wellawatte',
      date: '18 February 2025',
      items: [
        { name: 'Bedsheet', quantity: 2 },
        { name: 'Pillowcase', quantity: 4 },
        { name: 'Curtain', quantity: 1 }
      ],
      totalAmount: 3200,
      status: 'completed',
      currentStep: 'Completed'
    }
  ];
}
