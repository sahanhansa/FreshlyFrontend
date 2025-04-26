import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Driver {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  homeAddress: string;
  vehicleNo: string;
  location: string;
  region: string;
  bankDetails: {
    bankName: string;
    branch: string;
    accountNo: string;
  };
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
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [
    {
      id: '1007',
      name: 'Arthur Morgan',
      email: 'am@gmail.com',
      contactNo: '079 123 4567',
      homeAddress: 'No.62, YakabeddaRoad, Akuressa, Matara',
      vehicleNo: '2456',
      location: 'Location',
      region: 'Aviswawella',
      bankDetails: {
        bankName: 'ABC',
        branch: 'Galle Fort',
        accountNo: '0123 456 789'
      },
      profileImage: '/assets/images/driver-profile.jpg',
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

  selectedDriver: Driver | null = null;
  searchQuery: string = '';
  entriesPerPage: number = 10;
  currentPage: number = 1;

  ngOnInit(): void {
    // Initialize with first driver selected
    if (this.drivers.length > 0) {
      this.selectedDriver = this.drivers[0];
    }
  }

  selectDriver(driver: Driver): void {
    this.selectedDriver = driver;
  }

  searchDrivers(): void {
    // Implement search functionality
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
} 