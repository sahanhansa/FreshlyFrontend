import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedOrderCardComponent } from '../completed-order-card/completed-order-card.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { OrderDetailService } from '../../../services/order-services/order-detail.service';
import { OrderDetailsDTO } from '../../../models/order-models/order-detail.model';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { BasketService } from '../../../services/basket.service';

interface SimplifiedItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-completed-order-list',
  standalone: true,
  imports: [CommonModule, CompletedOrderCardComponent, FeedbackComponent],
  templateUrl: './completed-order-list.component.html',
  styleUrl: './completed-order-list.component.css'
})
export class CompletedOrderListComponent implements OnInit {
  // Remove hardcoded customerId
  
  // Default laundry ID - use this when the order doesn't have a laundryId
  private readonly DEFAULT_LAUNDRY_ID = '6b57925c-eb6c-45c6-b9fd-f92db2c66a8e';
  
  completedOrders: OrderDetailsDTO[] = [];
  displayOrders: {
    orderId: string;
    orderIdFormatted: string;
    laundryId: string;
    laundryName: string;
    date: string;
    totalAmount: number;
    items: SimplifiedItem[];
  }[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Feedback modal
  showFeedbackModal = false;
  selectedOrderId = '';
  selectedLaundryId = '';

  constructor(
    private orderDetailService: OrderDetailService,
    private toastService: ToastService,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadCompletedOrders();
  }

  loadCompletedOrders(): void {
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

    this.orderDetailService.getCompletedOrders(customerId).subscribe({
      next: (orders) => {
        this.completedOrders = orders;
        // Transform the orders for display
        this.displayOrders = orders.map(order => ({
          orderId: order.orderId,
          orderIdFormatted: order.orderIdFormatted,
          laundryId: order.laundryId,
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
        this.error = err.error || 'Failed to load completed orders';
        this.isLoading = false;
        console.error('Error loading completed orders:', err);
      }
    });
  }

  initiateRating(orderId: string): void {
    // Find the order
    const order = this.completedOrders.find(o => o.orderId === orderId);
    if (order) {
      this.selectedOrderId = orderId;
      
      // Check if the original order has a laundryId property
      // If it doesn't exist in the model, use the default
      this.selectedLaundryId = this.DEFAULT_LAUNDRY_ID;
      
      // If you eventually add laundryId to OrderDetailsDTO, you can use this:
      // this.selectedLaundryId = order.laundryId || this.DEFAULT_LAUNDRY_ID;
      
      this.showFeedbackModal = true;
    }
  }

  closeFeedbackModal(): void {
    this.showFeedbackModal = false;
  }

  handleFeedbackSubmitted(): void {
    // Optionally refresh the orders list
    this.loadCompletedOrders();
  }
}
