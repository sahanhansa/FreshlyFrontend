import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  homeAddress: string;
  officeAddress: string;
  location: string;
  profileImage: string;
  recentOrders?: Order[];
}

interface Order {
  orderId: string;
  date: string;
  status: string;
  driverId: string;
  laundryId: string;
  items: OrderItem[];
  subtotal: number;
}

interface OrderItem {
  item: string;
  process: string;
  clotheType: string;
  count: number;
  pricePerItem: number;
  totalPrice: number;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [
    {
      id: '1007',
      name: 'Arthur Morgan',
      email: 'am@gmail.com',
      contactNo: '079 123 4567',
      homeAddress: 'No.62, YakabeddaRoad, Akuressa, Matara',
      officeAddress: '255 Road,Katubedda,Moratuwa',
      location: 'Location',
      profileImage: '/assets/images/customer-profile.jpg',
      recentOrders: [
        {
          orderId: '#04',
          date: '18/12/2024',
          status: 'Processing',
          driverId: '#04',
          laundryId: '234',
          items: [
            { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
            { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
            { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
            { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
          ],
          subtotal: 1800
        }
      ]
    }
  ];

  selectedCustomer: Customer | null = null;
  searchQuery: string = '';
  entriesPerPage: number = 10;
  currentPage: number = 1;

  ngOnInit(): void {
    // Initialize with first customer selected
    if (this.customers.length > 0) {
      this.selectedCustomer = this.customers[0];
    }
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  searchCustomers(): void {
    // Implement search functionality
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  removeCustomer(): void {
    // Implement customer removal
  }
}