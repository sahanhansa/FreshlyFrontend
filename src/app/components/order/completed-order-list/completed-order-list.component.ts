import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedOrderCardComponent } from '../completed-order-card/completed-order-card.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { OrderDetailService } from '../../../services/order-services/order-detail.service';
import { OrderDetailsDTO } from '../../../models/order-models/order-detail.model';
import { ToastService } from '../../../services/toast.service';

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
  // This would normally come from auth service
  customerId = 'a4dca9b3-5f58-11f0-8064-0022481a06a0';
  
  // Default laundry ID - use this when the order doesn't have a laundryId
  private readonly DEFAULT_LAUNDRY_ID = 'efaa5020-331b-11f0-a791-c138d5830fc3';
  
  completedOrders: OrderDetailsDTO[] = [];
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
  
  // Feedback modal
  showFeedbackModal = false;
  selectedOrderId = '';
  selectedLaundryId = '';

  constructor(
    private orderDetailService: OrderDetailService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadCompletedOrders();
  }

  loadCompletedOrders(): void {
    this.isLoading = true;
    this.error = null;

    this.orderDetailService.getCompletedOrders(this.customerId).subscribe({
      next: (orders) => {
        this.completedOrders = orders;
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
