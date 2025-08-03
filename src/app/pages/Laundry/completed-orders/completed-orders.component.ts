import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
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

  constructor(private orderService: OrderService) {}

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
}
