import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-order-details',
  imports: [FormsModule],
  templateUrl:'./delivery-order-details.component.html',
  styleUrl: './delivery-order-details.component.css'
})
export class DeliveryOrderDetailsComponent {
  order = {
    id: 12345,
    customerName: 'Sahan Siriwardhana',
    address: '123 Main Street, City A',
    contact: '(123) 456-7890',
    items: '5 Shirts, 2 Pants, 1 Jacket',
    status: 'Pending',
    laundryName: 'Washmart',
    paymentMethod: 'Cash on Delivery',
    note: ''
  };

  updateNote(event: Event) {
    this.order.note = (event.target as HTMLTextAreaElement).value;
  }
}

