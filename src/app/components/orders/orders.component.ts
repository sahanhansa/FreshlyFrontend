import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';

interface OrderItem {
  item: string;
  process: string;
  clotheType: string;
  count: number;
  pricePerItem: number;
  totalPrice: number;
}

interface Order {
  id: string;
  date: string;
  status: 'Completed' | 'Picked Up' | 'Cancelled' | 'Processing';
  customerId: string;
  driverId: string;
  laundryId: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, SubtotalPipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [
    {
      id: '#01',
      date: '18/12/2024',
      status: 'Completed',
      customerId: '#01',
      driverId: '23',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#02',
      date: '18/12/2024',
      status: 'Picked Up',
      customerId: '#01',
      driverId: '24',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#03',
      date: '18/12/2024',
      status: 'Cancelled',
      customerId: '#01',
      driverId: '04',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#04',
      date: '18/12/2024',
      status: 'Processing',
      customerId: '#01',
      driverId: '07',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#05',
      date: '18/12/2024',
      status: 'Completed',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#06',
      date: '18/12/2024',
      status: 'Picked Up',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#07',
      date: '18/12/2024',
      status: 'Cancelled',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#08',
      date: '18/12/2024',
      status: 'Processing',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#09',
      date: '18/12/2024',
      status: 'Processing',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#10',
      date: '18/12/2024',
      status: 'Completed',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    }
  ];

  selectedOrder: Order | null = null;
  itemsPerPage = 9;
  currentPage = 1;

  constructor() { }

  ngOnInit(): void { }

  toggleOrderDetails(order: Order): void {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'picked up':
        return 'status-picked-up';
      case 'cancelled':
        return 'status-cancelled';
      case 'processing':
        return 'status-processing';
      default:
        return '';
    }
  }
} 