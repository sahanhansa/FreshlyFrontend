import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../order-card/order-card.component';
import { OrderStatusComponent, OrderDetails, OrderStatusStep } from '../order-status/order-status.component';
import { OrderDetailService } from '../../../services/order-services/order-detail.service';
import { OrderDetailsDTO } from '../../../models/order-models/order-detail.model';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'app-ongoing-order-list',
  standalone: true,
  imports: [CommonModule, OrderCardComponent, OrderStatusComponent],
  templateUrl: './ongoing-order-list.component.html',
  styleUrl: './ongoing-order-list.component.css'
})
export class OngoingOrderListComponent implements OnInit {
  // Remove hardcoded customer ID
  ongoingOrders: OrderDetailsDTO[] = [];
  isLoading = true;
  error: string | null = null;
  
  // For order status modal
  showOrderStatus = false;
  selectedOrder: OrderDetails | null = null;

  constructor(
    private orderDetailService: OrderDetailService,
    private toastService: ToastService,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadOngoingOrders();
  }

  loadOngoingOrders(): void {
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

    this.orderDetailService.getOngoingOrders(customerId).subscribe({
      next: (orders) => {
        this.ongoingOrders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to load ongoing orders';
        this.isLoading = false;
        console.error('Error loading ongoing orders:', err);
      }
    });
  }

  viewOrderDetails(orderId: string): void {
    const orderDto = this.ongoingOrders.find(o => o.orderId === orderId);
    if (!orderDto) return;

    // Map OrderDetailsDTO to OrderDetails for the status component
    this.selectedOrder = {
      id: orderDto.orderId,
      laundryName: orderDto.laundryName,
      date: orderDto.orderDateFormatted,
      totalAmount: orderDto.totalAmount,
      items: orderDto.items.map(item => ({ 
        name: item.itemName, 
        quantity: item.quantity 
      })),
      status: 'ongoing',
      currentStep: this.mapStatusToStep(orderDto.status)
    };
    
    this.showOrderStatus = true;
  }

  closeOrderStatus(): void {
    this.showOrderStatus = false;
    this.selectedOrder = null;
  }

  cancelOrder(orderId: string): void {
    this.orderDetailService.deleteOrder(orderId).subscribe({
      next: () => {
        this.toastService.show('Success', 'Order cancelled successfully', 'success');
        this.loadOngoingOrders();  // Refresh the list
        this.closeOrderStatus();
      },
      error: (err) => {
        this.toastService.show('Error', err.error || 'Failed to cancel order', 'error');
      }
    });
  }

  // Changed from private to public to allow access from template
  mapStatusToStep(status: string): OrderStatusStep {
    const statusLower = status?.toLowerCase() || '';
    
    switch (statusLower) {
      case 'order placed': return 'Order placed';
      case 'order pickup scheduled': return 'Order pickup scheduled';
      case 'picked up': return 'Order picked up';
      case 'processing in laundry': return 'Processing in laundry';
      case 'finished processing': return 'Finished processing';
      case 'out for delivery': return 'Out for delivery';
      case 'completed': return 'Delivered';
      default: return 'Order placed';
    }
  }
}