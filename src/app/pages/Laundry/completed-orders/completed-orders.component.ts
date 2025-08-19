import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { SearchBarComponent } from '../../../components/laundry/search-bar/search-bar.component';
import { PaginationComponent } from '../../../components/laundry/pagination/pagination.component'; 
import { FooterComponent } from '../../../components/shared/footer/footer.component'; 
import { RouterModule } from '@angular/router'; 
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';

@Component({
  selector: 'app-completed-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, PaginationComponent, SearchBarComponent, FooterComponent, NavbarComponent],
  templateUrl: './completed-orders.component.html'
})
export class CompletedOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;
  isSorted = false;
  originalOrders: Order[] = [];
  currentPage = 1;
  pageSize = 10;
  searchText: string = '';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompletedOrders();
  }

  loadCompletedOrders(): void {
    this.loading = true;
    this.error = null;
    
    // Get laundry ID from localStorage
    const laundryId = localStorage.getItem('laundryId');
    
    if (!laundryId) {
      this.error = 'Laundry ID not found. Please log in again.';
      this.loading = false;
      return;
    }
    
    this.orderService.getCompletedOrders(laundryId).subscribe({
      next: (data: Order[]) => {
        console.log('Completed orders data:', data); // Debug log
        this.orders = data;
        this.loading = false;
      },
      error: (err: any) => {
        if (err.status === 404) { 
          this.error = 'No completed orders found.'; 
        } else {
          this.error = 'Failed to load completed orders. Please try again later.';
        }
        this.loading = false;
        console.error('Error loading completed orders:', err);
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

  getFormattedDate(): string {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Search and pagination methods
  get filteredOrders(): Order[] {
    if (!this.searchText.trim()) return this.orders;
    
    const searchLower = this.searchText.toLowerCase();
    console.log('Searching for:', searchLower); // Debug log
    console.log('Available orders:', this.orders.length); // Debug log
    
    return this.orders.filter(order => {
      const matches = 
        order.orderId.toLowerCase().includes(searchLower) ||
        order.placedDate.toLowerCase().includes(searchLower) ||
        (order.customer?.customerFName && order.customer.customerFName.toLowerCase().includes(searchLower)) ||
        (order.customer?.customerLName && order.customer.customerLName.toLowerCase().includes(searchLower)) ||
        (order.customer?.customerFName && order.customer?.customerLName && 
         `${order.customer.customerFName} ${order.customer.customerLName}`.toLowerCase().includes(searchLower)) ||
        (order.status?.statusName && order.status.statusName.toLowerCase().includes(searchLower)) ||
        (order.totalCost && order.totalCost.toString().includes(searchLower));
      
      if (matches) {
        console.log('Match found for order:', order.orderId); // Debug log
      }
      return matches;
    });
  }

  get paginatedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredOrders.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onSearch(searchText: string) {
    console.log('Search triggered with text:', searchText); // Debug log
    this.searchText = searchText;
    this.currentPage = 1; // Reset to first page when searching
  }

  viewOrderDetails(orderId: string, statusId: string): void {
    // Navigate to order details with source parameter for home
    this.router.navigate(['/completed-order-details', orderId, statusId], { 
      queryParams: { source: 'home' } 
    });
  }
}
