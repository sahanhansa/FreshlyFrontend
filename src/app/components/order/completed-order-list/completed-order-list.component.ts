import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedOrderCardComponent } from '../completed-order-card/completed-order-card.component';
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
  imports: [CommonModule, CompletedOrderCardComponent],
  templateUrl: './completed-order-list.component.html',
  styleUrl: './completed-order-list.component.css'
})
export class CompletedOrderListComponent implements OnInit {
  // This would normally come from auth service
  customerId = 'a4dca9b3-5f58-11f0-8064-0022481a06a0';
  
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
    // This would typically open a rating modal
    this.toastService.show('Rating', 'Rating process initiated', 'info');
    console.log(`Initiating rating for order: ${orderId}`);
  }
}
