import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderDetail } from '../../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderDetail | null = null;
  error: string | null = null;
  processing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // Fetch order details using orderId from route params
  }

  startProcessing(): void {
    if (!this.orderDetails) return;

    this.processing = true;
    const laundryId = localStorage.getItem('laundryId');
    const orderId = this.orderDetails.orderId;
    const newStatusId = 'b8dfb69f-5f5e-11f0-8064-0022481a06a0';

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