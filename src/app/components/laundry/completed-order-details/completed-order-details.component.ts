import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
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
  selector: 'app-completed-order-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FooterComponent],
  templateUrl: './completed-order-details.component.html'
})
export class CompletedOrderDetailsComponent implements OnInit {
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

  goBack(): void {
    this.router.navigate(['/completed-orders']);
  }

  done(): void {
    this.router.navigate(['/laundry-orders']);
  }
} 