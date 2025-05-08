import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() deleteOrderEvent = new EventEmitter<string>(); // Output event

  orderItems: OrderItem[] = [];
  showDeleteConfirmation: boolean = false;

  ngOnInit() {
    this.orderItems = this.items;
  }

  //calculates total order price from all items
  get total(): number {
    return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Handler for the Edit button click
  editOrder() {
    console.log(`Edit order: ${this.orderId}`);
  }

  // Handler for Delete button click
  deleteOrder() {
    this.showDeleteConfirmation = true;
  }

  // Handler for confirming order deletion
  confirmDelete() {
    console.log(`Order ${this.orderId} deleted`);
    this.showDeleteConfirmation = false;
    this.deleteOrderEvent.emit(this.orderId); // Emit the order ID
  }

  // Handler for canceling order deletion
  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  // Handler for the Order Now button
  placeOrder() {
    console.log(`Place order: ${this.orderId}`);
  }

   // Method to remove a single item from the order
  deleteItem(itemId: number) {
    const index = this.orderItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.orderItems.splice(index, 1);
      console.log(`Item with ID ${itemId} removed from order ${this.orderId}`);
    }
  }
}
