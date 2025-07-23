import { Component, OnInit } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { FooterComponent } from "@app/components/shared/footer/footer.component";
import { DriverNavbarComponent } from "@app/components/driver/driver-navbar/driver-navbar.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Order {
  orderId: string;
  customerName: string;
  customerId: string;
  status: string;
  address: string;
  contact: string[];
  laundryName: string;
  deliveryDriverId: string;
  pickupDriverId: string;
}

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [FooterComponent, DriverNavbarComponent,CommonModule, FormsModule, ]
  
})
export class TasksComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const apiUrl = 'http://localhost:5027/api/order/GetAllCompleteTasks/92063843-b295-49a8-905e-9ae73bf4682a';

    this.http.get<Order[]>(apiUrl).subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }

  onSearchInput() {
    const searchLower = this.searchText.toLowerCase().trim();

    this.filteredOrders = this.orders.filter(order =>
      order.laundryName.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower)
    );
  }

  onSearchButton() {
    this.onSearchInput();
  }
}
