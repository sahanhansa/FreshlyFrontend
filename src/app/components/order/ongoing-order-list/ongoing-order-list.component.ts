import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../order-card/order-card.component';
import { OrderStatusComponent, OrderDetails, OrderStatusStep } from '../order-status/order-status.component';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  laundryName: string;
  date: string;
  totalAmount: number;
  items: OrderItem[];
  status: 'ongoing';
  currentStep: OrderStatusStep;
}

@Component({
  selector: 'app-ongoing-order-list',
  standalone: true,
  imports: [CommonModule, OrderCardComponent, OrderStatusComponent],
  templateUrl: './ongoing-order-list.component.html',
  styleUrl: './ongoing-order-list.component.css'
})
export class OngoingOrderListComponent {
  showStatusModal = false;
  selectedOrder: Order | null = null;
  
  // Sample data for ongoing orders
  ongoingOrders: Order[] = [
    {
      id: '456124',
      laundryName: 'Laundry 1, Colombo 7',
      date: '07 March 2025',
      totalAmount: 1250,
      items: [
        { name: 'Shirt', quantity: 2 },
        { name: 'Trouser', quantity: 1 }
      ],
      status: 'ongoing',
      currentStep: 'Picked up'
    },
    {
      id: '456123',
      laundryName: 'Laundry 3, Bambalapitiya',
      date: '08 March 2025',
      totalAmount: 3750,
      items: [
        { name: 'Tshirt', quantity: 1 },
        { name: 'Jacket', quantity: 2 },
        { name: 'Trouser', quantity: 1 },
        { name: 'Saree', quantity: 3 }
      ],
      status: 'ongoing',
      currentStep: 'Out for delivery'
    },
    {
      id: '456125',
      laundryName: 'Laundry 2, Nugegoda',
      date: '09 March 2025',
      totalAmount: 1850,
      items: [
        { name: 'Bedsheet', quantity: 2 },
        { name: 'Pillowcase', quantity: 4 }
      ],
      status: 'ongoing',
      currentStep: 'Order placed'
    }
  ];

  showOrderStatus(order: Order): void {
    this.selectedOrder = order;
    this.showStatusModal = true;
    // Add class to body to prevent scrolling when modal is open
    document.body.classList.add('overflow-hidden');
  }

  closeModal(): void {
    this.showStatusModal = false;
    // Remove class from body to allow scrolling again
    document.body.classList.remove('overflow-hidden');
  }
  
  cancelOrder(orderId: string): void {
    // Find the order index
    const orderIndex = this.ongoingOrders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      // Remove from ongoing orders
      this.ongoingOrders.splice(orderIndex, 1);
      
      // Show feedback (in a real app, you'd likely call a service to cancel the order)
      alert(`Order #${orderId} has been cancelled`);
    }
    
    this.closeModal();
  }
}