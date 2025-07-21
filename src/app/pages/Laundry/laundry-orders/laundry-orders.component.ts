import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { SearchBarComponent } from '@app/components/laundry/search-bar/search-bar.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component'; 
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-orders',
  imports: [CommonModule, RouterModule, HttpClientModule, PaginationComponent, SearchBarComponent, FooterComponent, NavbarComponent],
  templateUrl: './laundry-orders.component.html'
})
export class LaundryOrdersComponent implements OnInit {
  orders: Order[] = [];
  orderDetails: Order[] = [];
  loading = false;
  error: string | null = null;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders(): void {
    this.loading = true;
    this.error = null;
    
    const laundryId = localStorage.getItem('laundryId');
    


    if (!laundryId) {
      this.error = 'Laundry ID not found. Please log in again.';
      this.loading = false;
      return;
    }
    

    // Call the service method to fetch regular orders for today
    this.orderService.getAllOrders(laundryId).subscribe({
      next: (data: Order[]) => {
        this.orders = data; // Assign the fetched orders to the orders array
        this.loading = false; // Set loading to false when data has been successfully fetched
      },
      error: (err: any) => {
        // Handle error response
        if (err.status === 404) { 
          this.error = 'No orders found.'; 
        } else {
          this.error = 'Failed to load orders. Please try again later.'; // Generic error message
        }
        this.loading = false; // Set loading to false even if there was an error
        console.error('Error loading orders:', err); // Log the error for debugging

      }
    });
  }

  loadOrderDetails(): void {
    this.orderService.getOrderDetails().subscribe({
      next: (data: Order[]) => {
        this.orderDetails = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading order details:', err);
        this.loading = false;
      }
    });
  }

  getOrderAmount(orderId: string): number {
    const orderDetail = this.orderDetails.find(detail => detail.orderId === orderId);
    return orderDetail?.totalCost || 0;
  }

  getFormattedDate(): string {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getOrderDetailsRoute(order: Order): any[] {
    const orderId = order.orderId;
    const statusId = order.status.statusID;
    const status = order.status.statusName?.toLowerCase();
    switch (status) {
      case 'completed':
      case 'delivered':
      case 'out for delivery':
      case 'finished processing':
        return ['/completed-order-details', orderId, statusId];
      case 'processing in laundry':
        return ['/processing-order-details', orderId, statusId];
      case 'order picked up':
        return ['/new-order-details', orderId, statusId];
      default:
        return ['/order-summary'];
    }
  }

  getStatusBorderClass(order: Order): string {
    const status = order.status.statusName?.toLowerCase();
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'border-l-4 border-green-400';
      case 'finished processing':
        return 'border-l-4 border-blue-400';
      case 'processing in laundry':
        return 'border-l-4 border-yellow-400';
      case 'order picked up':
        return 'border-l-4 border-orange-400';
      case 'out for delivery':
        return 'border-l-4 border-purple-400';
      case 'order placed':
        return 'border-l-4 border-gray-400';
      default:
        return 'border-l-4 border-transparent';
    }
  }

  getStatusBadgeClass(order: Order): string {
    const status = order.status.statusName?.toLowerCase();
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'finished processing':
        return 'bg-blue-200 text-blue-800';
      case 'processing in laundry':
        return 'bg-yellow-100 text-yellow-800';
      case 'order picked up':
        return 'bg-orange-100 text-orange-800';
      case 'out for delivery':
        return 'bg-purple-100 text-purple-800';
      case 'order placed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  }

  goToOrderDetails(order: Order): void {
    const route = this.getOrderDetailsRoute(order);
    this.router.navigate(route);
  }
}
