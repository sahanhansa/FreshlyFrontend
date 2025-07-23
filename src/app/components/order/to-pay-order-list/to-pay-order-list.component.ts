import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToPayOrderCardComponent } from '../to-pay-order-card/to-pay-order-card.component';
import { OrderDetailService } from '../../../services/order-services/order-detail.service';
import { OrderDetailsDTO, OrderItemDTO } from '../../../models/order-models/order-detail.model';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { BasketService } from '../../../services/basket.service';

interface SimplifiedItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-to-pay-order-list',
  standalone: true,
  imports: [CommonModule, ToPayOrderCardComponent],
  templateUrl: './to-pay-order-list.component.html',
  styleUrl: './to-pay-order-list.component.css'
})
export class ToPayOrderListComponent implements OnInit {
  toPayOrders: OrderDetailsDTO[] = [];
  displayOrders: {
    orderId: string;
    orderIdFormatted: string;
    laundryName: string;
    date: string;
    totalAmount: number;
    items: SimplifiedItem[];
  }[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private orderDetailService: OrderDetailService,
    private toastService: ToastService,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadToPayOrders();
  }

  loadToPayOrders(): void {
    this.isLoading = true;
    this.error = null;

    // Get customer ID from BasketService
    const customerId = this.basketService.getCustomerId();
    if (!customerId) {
      this.error = 'You need to be logged in to view your orders';
      this.isLoading = false;
      this.toastService.show('Error', 'Please log in to view your orders', 'error');
      this.router.navigate(['/cus-login']);
      return;
    }

    this.orderDetailService.getOutForDeliveryOrders(customerId).subscribe({
      next: (orders) => {
        this.toPayOrders = orders;
        // Transform the orders for display
        this.displayOrders = orders.map(order => ({
          orderId: order.orderId,
          orderIdFormatted: order.orderIdFormatted,
          laundryName: order.laundryName,
          date: order.orderDateFormatted,
          totalAmount: order.totalAmount,
          items: order.items.map(item => ({
            name: item.itemName,
            quantity: item.quantity
          }))
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to load orders that need payment';
        this.isLoading = false;
        console.error('Error loading to-pay orders:', err);
      }
    });
  }

  initiatePayment(orderId: string): void {
    // This would typically redirect to a payment gateway or show a payment modal
    this.toastService.show('Payment', 'Payment process initiated', 'info');
    console.log(`Initiating payment for order: ${orderId}`);
    // Implement actual payment logic here
  }
}