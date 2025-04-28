import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../order-card/order-card.component';

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
  status: 'delivered' | 'cancelled';
}

@Component({
  selector: 'app-past-order-list',
  standalone: true,
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './past-order-list.component.html',
  styleUrl: './past-order-list.component.css'
})
export class PastOrderListComponent {
  // Sample data - in a real app, this would come from a service
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
      status: 'delivered'
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
      status: 'delivered'
    },
    {
      id: '456111',
      laundryName: 'Laundry 1, Colombo 7',
      date: '10 February 2025',
      items: [
        { name: 'Suit', quantity: 1 },
        { name: 'Shirt', quantity: 2 }
      ],
      totalAmount: 2100,
      status: 'cancelled'
    }
  ];
}
