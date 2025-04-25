import { Component } from '@angular/core';
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
export class OrderSummaryComponent {
  orderId: string = '#123456';
  laundryName: string = 'Laundry 1, Colombo 7';
  
  orderItems: OrderItem[] = [
    {
      id: 1,
      name: 'T-shirt',
      material: 'Cotton',
      washMethod: 'Wash and Dry',
      price: 250,
      quantity: 3,
      image: 'assets/tshirt.png'
    },
    {
      id: 2,
      name: 'Frock',
      material: 'Linen',
      washMethod: 'Dry clean',
      price: 600,
      quantity: 1,
      image: 'assets/frock.png'
    },
    {
      id: 3,
      name: 'Trouser',
      material: 'Cotton',
      washMethod: 'Wash and Dry',
      price: 400,
      quantity: 2,
      image: 'assets/trousers.png'
    },
    {
      id: 4,
      name: 'Jacket',
      material: 'Polyester',
      washMethod: 'Iron only',
      price: 300,
      quantity: 1,
      image: 'assets/jacket.png'
    }
  ];

  get total(): number {
    return this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  editOrder() {
    console.log('Edit order clicked');
    // Implement edit functionality
  }

  deleteOrder() {
    console.log('Delete order clicked');
    // Implement delete functionality
  }

  placeOrder() {
    console.log('Order now clicked');
    // Implement place order functionality
  }

  deleteItem(itemId: number) {
    // Find the item index
    const index = this.orderItems.findIndex(item => item.id === itemId);
    
    // Remove the item if found
    if (index !== -1) {
      this.orderItems.splice(index, 1);
      
      // You might want to show a confirmation message
      console.log(`Item with ID ${itemId} has been removed`);
      
      // If you're using a service for state management, update the state
      // this.orderService.updateOrderItems(this.orderItems);
    }
  }
}
