import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusStep } from '../order-status/order-status.component';

// Define the interface for order items within completed orders
interface OrderItem {
  name: string;
  quantity: number;
}

// Define the interface for a completed order
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
  imports: [CommonModule], // Removed OrderCardComponent since it's not used
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
