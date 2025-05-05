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
        },
        {
          orderId: '#03',
          date: '15/12/2024',
          status: 'Completed',
          driverId: '#02',
          laundryId: '156',
          items: [
            { item: 'Curtains', process: 'Dry Clean', clotheType: 'Home', count: 2, pricePerItem: 800, totalPrice: 1600 },
            { item: 'Suit', process: 'Premium Clean', clotheType: 'Mens', count: 1, pricePerItem: 1200, totalPrice: 1200 },
            { item: 'Dress', process: 'Steam Iron', clotheType: 'Ladies', count: 2, pricePerItem: 400, totalPrice: 800 }
          ],
          subtotal: 3600
        },
        {
          orderId: '#02',
          date: '10/12/2024',
          status: 'Picked Up',
          driverId: '#05',
          laundryId: '189',
          items: [
            { item: 'Jacket', process: 'Dry Clean', clotheType: 'Mens', count: 1, pricePerItem: 900, totalPrice: 900 },
            { item: 'Blanket', process: 'Deep Clean', clotheType: 'Home', count: 2, pricePerItem: 700, totalPrice: 1400 },
            { item: 'Shoes', process: 'Premium Clean', clotheType: 'Sports', count: 1, pricePerItem: 600, totalPrice: 600 }
          ],
          subtotal: 2900
        },
        {
          orderId: '#01',
          date: '05/12/2024',
          status: 'Cancelled',
          driverId: '#03',
          laundryId: '167',
          items: [
            { item: 'Carpet', process: 'Deep Clean', clotheType: 'Home', count: 1, pricePerItem: 2000, totalPrice: 2000 },
            { item: 'Curtains', process: 'Wash+Iron', clotheType: 'Home', count: 3, pricePerItem: 500, totalPrice: 1500 }
          ],
          subtotal: 3500
        }
      ]
    }
  ];

  selectedCustomer: Customer | null = null;
  searchQuery: string = '';
  entriesPerPage: number = 10;
  currentPage: number = 1;

  get filteredCustomers(): Customer[] {
    return this.customers.filter(customer => 
      this.searchQuery ? 
        customer.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.contactNo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      : true
    );
  }

  get paginatedCustomers(): Customer[] {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    return this.filteredCustomers.slice(startIndex, startIndex + this.entriesPerPage);
  }

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
    // Reset to first page when searching
    this.currentPage = 1;
    // Filtering logic will be implemented here
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  removeCustomer(): void {
    // Implement customer removal
  }

  toggleOrderDetails(order: Order): void {
    order.isExpanded = !order.isExpanded;
  }
}