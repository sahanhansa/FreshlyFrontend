import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { LaundryService } from '../../../services/laundry.service';
import { OrderDetail } from '../../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderDetail | null = null;
  error: string | null = null;
  processing: boolean = false;
  
  // Dynamic status ID for 'Processing in laundry' loaded from backend
  private processingStatusId: string | null = null;
  public isLoadingStatusIds = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private laundryService: LaundryService
  ) { }

  ngOnInit(): void {
    // Load status IDs first
    this.loadStatusIds();
    // Fetch order details using orderId from route params
  }

  // Method to load status IDs from the backend
  loadStatusIds(): void {
    this.isLoadingStatusIds = true;
    this.laundryService.getStatusIds().subscribe({
      next: (statusIds) => {
        this.processingStatusId = statusIds.processing;
        this.isLoadingStatusIds = false;
        console.log('Status IDs loaded dynamically:', statusIds);
      },
      error: (error) => {
        console.error('Error loading status IDs:', error);
        this.isLoadingStatusIds = false;
        this.processingStatusId = null;
      }
    });
  }

  startProcessing(): void {
    if (!this.orderDetails) return;

    // Check if status ID is loaded
    if (!this.processingStatusId) {
      this.error = 'Status information not loaded. Please try again.';
      return;
    }

    this.processing = true;
    const laundryId = localStorage.getItem('laundryId');
    const orderId = this.orderDetails.orderId;
    const newStatusId = this.processingStatusId;

    if (!laundryId) {
      this.error = 'Laundry ID not found';
      this.processing = false;
      return;
    }

    this.orderService.patchOrderStatus(laundryId, orderId, newStatusId).subscribe({
      next: () => {
        if (this.orderDetails) {
          this.orderDetails.status = 'Processing in Laundry';
        }
        this.processing = false;
        this.router.navigate(['/processing-orders']);
      },
      error: (err) => {
        this.error = 'Failed to update order status. Please try again.';
        this.processing = false;
        console.error('Error updating order status:', err);
      }
    });
  }
}