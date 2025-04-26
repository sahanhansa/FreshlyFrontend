import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LaundryOrder {
  orderId: string;
  date: string;
  status: string;
  driverId: string;
  laundryId: string;
  items: OrderItem[];
  isExpanded?: boolean;
}

interface OrderItem {
  item: string;
  process: string;
  clotheType: string;
  count: number;
  pricePerItem: number;
  totalPrice: number;
}

interface Laundry {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  address: string;
  location: string;
  bankDetails: {
    name: string;
    branch: string;
    accountNo: string;
  };
  image: string;
  recentOrders: LaundryOrder[];
}

@Component({
  selector: 'app-laundries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laundries.component.html',
  styleUrls: ['./laundries.component.scss']
})
export class LaundriesComponent implements OnInit {
  laundry: Laundry = {
    id: '#1007',
    name: 'Arthur Morgan',
    email: 'am@gmail.com',
    contactNo: '079 123 4567',
    address: 'No.62, YakabeddaRoad, Akuressa, Matara',
    location: 'Location',
    bankDetails: {
      name: 'ABC',
      branch: 'Katubedda',
      accountNo: '0987 654 321'
    },
    image: 'assets/images/laundry1.jpg',
    recentOrders: [
      {
        orderId: '#04',
        date: '18/12/2024',
        status: 'Processing',
        driverId: '234',
        laundryId: '234',
        isExpanded: false,
        items: [
          { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
          { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
          { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
          { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
        ]
      },
      {
        orderId: '#04',
        date: '18/12/2024',
        status: 'Processing',
        driverId: '#04',
        laundryId: '234',
        isExpanded: false,
        items: [
          { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
          { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
          { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
          { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
        ]
      }
    ]
  };

  currentPage = 1;
  itemsPerPage = 9;

  constructor() {}

  ngOnInit(): void {}

  removeUser(): void {
    // Implement user removal logic
    console.log('Removing laundry:', this.laundry.id);
  }

  calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  toggleOrderDetails(order: LaundryOrder): void {
    order.isExpanded = !order.isExpanded;
  }
} 