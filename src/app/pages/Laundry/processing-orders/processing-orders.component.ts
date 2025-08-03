import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../../services/order.service'; // Import OrderService for fetching orders
import { Order } from '../../../models/order.model'; // Import Order model to type the orders array
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { PaginationComponent } from '../../../components/laundry/pagination/pagination.component'; 
import { FooterComponent } from '../../../components/shared/footer/footer.component'; 
import { RouterModule, Router } from '@angular/router'; 
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';

@Component({
  selector: 'app-processing-orders', 
  standalone: true, 
  imports: [CommonModule, RouterModule, HttpClientModule, PaginationComponent, SearchBarComponent, FooterComponent, NavbarComponent], 
  templateUrl: './processing-orders.component.html'
})
export class processingOrdersComponent implements OnInit, OnDestroy { // The component class that implements OnInit lifecycle hook
  orders: Order[] = []; // Declare an array to store the orders fetched from the backend
  loading = false; // Flag to indicate if data is still being loaded
  error: string | null = null; // Variable to store any error message
  isSorted = false;
  originalOrders: Order[] = [];
  highlightedOrderId: string | null = null;
  currentPage = 1;
  pageSize = 10;

  constructor(private orderService: OrderService, private router: Router) {} // Inject the OrderService to interact with the backend API

  ngOnInit(): void {
    this.loadProcessingOrders(); // Fetch the new orders when the component is initialized
    this.checkHighlightedOrder();
  }

  ngOnDestroy(): void {
    // Clear highlighted order data when component is destroyed
    localStorage.removeItem('highlightedOrderId');
    localStorage.removeItem('highlightedOrderTimestamp');
  }

  // Method to check for highlighted order and manage highlighting
  checkHighlightedOrder(): void {
    const highlightedOrderId = localStorage.getItem('highlightedOrderId');
    const highlightedOrderTimestamp = localStorage.getItem('highlightedOrderTimestamp');
    
    if (highlightedOrderId && highlightedOrderTimestamp) {
      const timestamp = parseInt(highlightedOrderTimestamp);
      const currentTime = Date.now();
      const timeDiff = currentTime - timestamp;
      
      // Highlight for 30 seconds (30000ms) instead of 10 seconds
      if (timeDiff < 30000) {
        this.highlightedOrderId = highlightedOrderId;
        // Clear the highlight after 30 seconds
        setTimeout(() => {
          this.highlightedOrderId = null;
          localStorage.removeItem('highlightedOrderId');
          localStorage.removeItem('highlightedOrderTimestamp');
        }, 30000 - timeDiff);
      } else {
        // Clear old highlighted order data
        localStorage.removeItem('highlightedOrderId');
        localStorage.removeItem('highlightedOrderTimestamp');
      }
    }
  }

  // Method to check if an order should be highlighted
  isOrderHighlighted(orderId: string): boolean {
    return this.highlightedOrderId === orderId;
  }

  // Method to clear highlight when user clicks on a different order
  onOrderClick(orderId: string): void {
    // If clicking on a different order, clear the highlight
    if (this.highlightedOrderId && this.highlightedOrderId !== orderId) {
      this.highlightedOrderId = null;
      localStorage.removeItem('highlightedOrderId');
      localStorage.removeItem('highlightedOrderTimestamp');
    }
  }

  // Method to fetch regular orders from the backend
  loadProcessingOrders(): void {
    this.loading = true; // Set loading to true when the data request starts
    this.error = null; // Clear any previous error messages
    
    // Get laundry ID from localStorage
    const laundryId = localStorage.getItem('laundryId');
    
    if (!laundryId) {
      this.error = 'Laundry ID not found. Please log in again.';
      this.loading = false;
      return;
    }
    
    // Call the service method to fetch regular orders for today
    this.orderService.getProcessingOrders(laundryId).subscribe({
      next: (data: Order[]) => {
        this.orders = data; // Assign the fetched orders to the orders array
        this.loading = false; // Set loading to false when data has been successfully fetched
      },
      error: (err: any) => {
        // Handle error response
        if (err.status === 404) { 
          this.error = 'No processing orders found.'; 
        } else {
          this.error = 'Failed to load processing orders. Please try again later.'; // Generic error message
        }
        this.loading = false; // Set loading to false even if there was an error
        console.error('Error loading processing orders:', err); // Log the error for debugging
      }
    });
  }

  toggleSort() {
    this.isSorted = !this.isSorted;
    if (this.isSorted) {
      const laundryId = localStorage.getItem('laundryId');
      if (!laundryId) return;
      this.orderService.getSortedOrderIds(laundryId).subscribe(sortedIds => {
        this.originalOrders = [...this.orders];
        this.orders = sortedIds
          .map(id => this.orders.find(order => order.orderId === id))
          .filter(order => !!order) as Order[];
      });
    } else {
      this.orders = [...this.originalOrders];
    }
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

  // Pagination methods
  get paginatedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.orders.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  viewOrderDetails(orderId: string, statusId: string): void {
    // Navigate to order details with source parameter for home
    this.router.navigate(['/processing-order-details', orderId, statusId], { 
      queryParams: { source: 'home' } 
    });
  }
}
