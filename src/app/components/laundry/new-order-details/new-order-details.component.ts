import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { LaundryService } from '../../../services/laundry.service';
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

  // Dynamic status ID for 'Processing in laundry' loaded from backend
  private processingStatusId: string | null = null;
  public isLoadingStatusIds = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private laundryService: LaundryService
  ) {}

  ngOnInit(): void {
    // Load status IDs first
    this.loadStatusIds();
    this.loadOrderDetails();
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

  // Method to get status badge styling
  getStatusBadgeClass(status: string): string {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'finished processing':
        return 'bg-blue-200 text-blue-800';
      case 'processing in laundry':
        return 'bg-yellow-100 text-yellow-800';
      case 'order picked up':
      case 'picked up':
        return 'bg-orange-100 text-orange-800';
      case 'out for delivery':
        return 'bg-purple-100 text-purple-800';
      case 'order placed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  }

  // Method to get display status text
  getDisplayStatus(status: string): string {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'order picked up' || statusLower === 'picked up') {
      return 'New';
    }
    return status;
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

    // Check if status ID is loaded
    if (!this.processingStatusId) {
      this.error = 'Status information not loaded. Please try again.';
      return;
    }

    this.processing = true;
    const laundryId = localStorage.getItem('laundryId');
    const orderId = this.orderDetails.orderId;
    // Use the dynamic statusId for 'Processing in laundry'
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
        // Store the order ID to highlight it in the processing orders list
        localStorage.setItem('highlightedOrderId', orderId);
        localStorage.setItem('highlightedOrderTimestamp', Date.now().toString());
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
    // Get the source from route parameters or localStorage
    const source = this.route.snapshot.queryParamMap.get('source') || localStorage.getItem('orderDetailsSource') || 'home';
    
    switch (source) {
      case 'home':
        this.router.navigate(['/completed-orders']);
        break;
      case 'orders':
        this.router.navigate(['/laundry-orders']);
        break;
      case 'feedbacks':
        this.router.navigate(['/laundry-feedbacks']);
        break;
      default:
        this.router.navigate(['/new-orders']);
    }
  }
} 