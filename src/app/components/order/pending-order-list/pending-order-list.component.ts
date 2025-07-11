import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { BasketService } from '../../../services/basket.service';
import { ToastService } from '../../../services/toast.service';
import { TemporaryOrderSummary } from '../../../models/basket.model';

@Component({
  selector: 'app-pending-order-list',
  standalone: true,
  imports: [CommonModule, OrderSummaryComponent],
  templateUrl: './pending-order-list.component.html',
  styleUrl: './pending-order-list.component.css'
})
export class PendingOrderListComponent implements OnInit {
  // Data from the backend
  orderSummaries: TemporaryOrderSummary[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private basketService: BasketService,
    private toastService: ToastService
  ) {}
  
  ngOnInit(): void {
    this.loadOrderSummaries();
  }
  
  loadOrderSummaries(): void {
    this.loading = true;
    this.error = '';
    
    this.basketService.getCustomerOrderSummaries().subscribe({
      next: (data) => {
        this.orderSummaries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading order summaries', err);
        this.error = 'Failed to load your orders.';
        this.loading = false;
        this.toastService.show('Error', 'Could not load your orders', 'error');
      }
    });
  }

  // Method to handle "Order Now" button click
  createNewOrder() {
    this.router.navigate(['/laundries']);
  }

  // Method to handle order deletion events
  onDeleteOrder(orderId: string) {
    this.orderSummaries = this.orderSummaries.filter(
      summary => summary.temporaryOrderId !== orderId
    );
  }
  
  // Method to refresh orders
  refreshOrders() {
    this.loadOrderSummaries();
  }
}
