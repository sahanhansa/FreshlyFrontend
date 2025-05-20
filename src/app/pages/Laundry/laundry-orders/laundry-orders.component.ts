
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../../services/order.service'; // Import OrderService for fetching orders
import { Order } from '../../../models/order.model'; // Import Order model to type the orders array
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component'; 
import { RouterModule } from '@angular/router';; 
import { HeaderComponent } from '../../../components/laundry/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-orders',
  imports: [CommonModule, RouterModule, HttpClientModule, PaginationComponent, SearchBarComponent, FooterComponent,HeaderComponent],
  templateUrl: './laundry-orders.component.html',
  styleUrl: './laundry-orders.component.css'
})

export class LaundryOrdersComponent implements OnInit { // The component class that implements OnInit lifecycle hook
  orders: Order[] = []; // Declare an array to store the orders fetched from the backend
  loading = false; // Flag to indicate if data is still being loaded
  error: string | null = null; // Variable to store any error message

  constructor(private orderService: OrderService) {} // Inject the OrderService to interact with the backend API

  ngOnInit(): void {
    this.loadAllOrders(); // Fetch the new orders when the component is initialized
  }

  // Method to fetch regular orders from the backend
  loadAllOrders(): void {
    this.loading = true; // Set loading to true when the data request starts
    this.error = null; // Clear any previous error messages
    
    // Call the service method to fetch regular orders for today
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data; // Assign the fetched orders to the orders array
        this.loading = false; // Set loading to false when data has been successfully fetched
      },
      error: (err) => {
        // Handle error response
        if (err.status === 404) { 
          this.error = 'No new orders found for today.'; 
        } else {
          this.error = 'Failed to load new orders. Please try again later.'; // Generic error message
        }
        this.loading = false; // Set loading to false even if there was an error
        console.error('Error loading new orders:', err); // Log the error for debugging
      }
    });
  }

  // Method to format the current date into a readable format
  getFormattedDate(): string {
    const today = new Date(); // Get today's date

    // Format the date into a string 
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
