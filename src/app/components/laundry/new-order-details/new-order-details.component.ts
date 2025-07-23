import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

interface OrderItem {
  itemName: string;
  quantity: number;
  price: number;
  itemId: string;
  serviceId: string;
  serviceName: string;
  garmentTypeId?: string;
  garmentTypeName?: string;
}

interface OrderDetails {
  orderId: string;
  orderIdFormatted: string;
  orderDate: string;
  orderDateFormatted: string;
  laundryName: string;
  laundryLocation: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  pickupDate: string;
  pickupDateFormatted: string;
  shouldShowPickupDetails: boolean;
  customer?: {
    customerId: string;
    firstName: string;
    lastName: string;
    customerFName: string;
    customerLName: string;
  };
}

@Component({
  selector: 'app-new-order-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavbarComponent,FooterComponent],
  templateUrl: './new-order-details.component.html'
})
export class NewOrderDetailsComponent implements OnInit {
  orderDetails: OrderDetails | null = null;
  customerName: string | null = null;
  customerContactNumbers: string[] = [];
  loading = false;
  error: string | null = null;
  processing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    this.loading = true;
    this.error = null;

    const laundryId = localStorage.getItem('laundryId');
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const statusId = this.route.snapshot.paramMap.get('statusId');

    if (!laundryId || !orderId || !statusId) {
      this.error = 'Missing required parameters';
      this.loading = false;
      return;
    }

    this.orderService.getOrderDetailsById(laundryId, orderId, statusId).subscribe({
      next: (data: any) => {
        // Support new API response structure
        if (data.orderDetails) {
          this.orderDetails = data.orderDetails;
          this.customerName = data.customerName || null;
          this.customerContactNumbers = data.customerContactNumbers || [];
        } else {
          this.orderDetails = data;
          this.customerName = null;
          this.customerContactNumbers = [];
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order details. Please try again.';
        this.loading = false;
        console.error('Error loading order details:', err);
      }
    });
  }

  startProcessing(): void {
    if (!this.orderDetails) return;

    this.processing = true;
    const laundryId = localStorage.getItem('laundryId');
    const orderId = this.orderDetails.orderId;
    // Use the provided statusId for 'Processing in laundry'
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

  goBack(): void {
    this.router.navigate(['/new-orders']);
  }
} 