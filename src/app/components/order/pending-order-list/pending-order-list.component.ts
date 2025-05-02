import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

interface OrderItem {
  id: number;
  name: string;
  material: string;
  washMethod: string;
  price: number;
  quantity: number;
  image: string;
}

interface PendingOrder {
  id: string;
  laundryName: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-pending-order-list',
  standalone: true,
  imports: [CommonModule, OrderSummaryComponent],
  templateUrl: './pending-order-list.component.html',
  styleUrl: './pending-order-list.component.css'
})
export class PendingOrderListComponent {
  pendingOrders: PendingOrder[] = [
    {
      id: '123456',
      laundryName: 'Laundry 1, Colombo 7',
      items: [
        { id: 1, name: 'T-shirt', material: 'Cotton', washMethod: 'Wash and Dry', price: 250, quantity: 3, image: 'assets/tshirt.png' },
        { id: 2, name: 'Trouser', material: 'Cotton', washMethod: 'Wash and Dry', price: 400, quantity: 2, image: 'assets/trousers.png' },
        { id: 3, name: 'Jacket', material: 'Polyester', washMethod: 'Iron only', price: 300, quantity: 1, image: 'assets/jacket.png' },
        { id: 4, name: 'Frock', material: 'Linen', washMethod: 'Dry clean', price: 600, quantity: 1, image: 'assets/frock.png' }
      ]
    },
    {
      id: '123457',
      laundryName: 'Laundry 5, Wellawatte',
      items: [
        { id: 5, name: 'Bedsheet', material: 'Cotton', washMethod: 'Wash and Iron', price: 650, quantity: 2, image: 'assets/bedsheet.png' },
        { id: 6, name: 'Pillowcase', material: 'Cotton', washMethod: 'Wash and Iron', price: 150, quantity: 4, image: 'assets/pillowcase.png' },
        { id: 7, name: 'Curtain', material: 'Silk', washMethod: 'Dry clean', price: 1200, quantity: 1, image: 'assets/curtain.png' },
        { id: 8, name: 'Blanket', material: 'Wool', washMethod: 'Wash and Dry', price: 800, quantity: 1, image: 'assets/blanket.png' }
      ]
    },
    {
      id: '123458',
      laundryName: 'Laundry 3, Bambalapitiya',
      items: [
        { id: 9, name: 'Suit', material: 'Wool', washMethod: 'Dry Clean', price: 1200, quantity: 1, image: 'assets/suit.png' },
        { id: 10, name: 'Tie', material: 'Silk', washMethod: 'Dry Clean', price: 300, quantity: 2, image: 'assets/tie.png' },
        { id: 11, name: 'Shirt', material: 'Cotton', washMethod: 'Wash and Dry', price: 250, quantity: 5, image: 'assets/shirt.png' },
        { id: 12, name: 'Towel', material: 'Cotton', washMethod: 'Wash and Dry', price: 150, quantity: 3, image: 'assets/towel.png' }
      ]
    }
  ];

  constructor(private router: Router) {}

  // For testing empty state, you can uncomment this line:
  // pendingOrders: PendingOrder[] = [];

  createNewOrder() {
    this.router.navigate(['/laundries']);
  }

  onDeleteOrder(orderId: string) {
    // Find and remove the order with the matching ID
    this.pendingOrders = this.pendingOrders.filter(order => order.id !== orderId);
  }
}
