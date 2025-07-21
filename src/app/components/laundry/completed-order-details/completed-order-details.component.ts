import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Subject, takeUntil, catchError, of } from 'rxjs';

interface OrderItem {
  itemName: string;
  quantity: number;
  price: number;
  itemId: string;
  serviceId: string;
  serviceName: string;
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
  imports: [CommonModule, HttpClientModule, FooterComponent],
  templateUrl: './completed-order-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompletedOrderDetailsComponent implements OnInit, OnDestroy {
  orderDetails: OrderDetails | null = null;
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  private itemsByServiceCache: { [key: string]: OrderItem[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadOrderDetails(): void {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();

    const laundryId = localStorage.getItem('laundryId');
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const statusId = this.route.snapshot.paramMap.get('statusId');

    if (!laundryId || !orderId || !statusId) {
      this.error = 'Missing required parameters';
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }

    this.orderService.getOrderDetailsById(laundryId, orderId, statusId)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.error = 'Failed to load order details. Please try again.';
          this.loading = false;
          this.cdr.markForCheck();
          console.error('Error loading order details:', err);
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          this.orderDetails = data;
          // Clear cache when new data is loaded
          this.itemsByServiceCache = {};
        }
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  getItemsByService(): { [key: string]: OrderItem[] } {
    if (!this.orderDetails) return {};
    
    // Return cached result if available
    if (Object.keys(this.itemsByServiceCache).length > 0) {
      return this.itemsByServiceCache;
    }
    
    // Calculate and cache the result
    this.itemsByServiceCache = this.orderDetails.items.reduce((groups, item) => {
      const serviceName = item.serviceName;
      if (!groups[serviceName]) {
        groups[serviceName] = [];
      }
      groups[serviceName].push(item);
      return groups;
    }, {} as { [key: string]: OrderItem[] });
    
    return this.itemsByServiceCache;
  }

  trackByService(index: number, serviceGroup: any): string {
    return serviceGroup.key;
  }

  trackByItem(index: number, item: OrderItem): string {
    return item.itemId;
  }

  done(): void {
    this.router.navigate(['/laundry/orders']);
  }
}