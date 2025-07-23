import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  status?: 'processing' | 'finished';
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

interface AdjustmentForm {
  name: string;
  mobileNumber: string;
  reason: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-processing-order-details',
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './processing-order-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProcessingOrderDetailsComponent implements OnInit, OnDestroy {
  orderDetails: OrderDetails | null = null;
  loading = false;
  error: string | null = null;
  processing = false;
  adjustmentForm: FormGroup;
  showAdjustmentModal = false;
  adjustmentType: 'add' | 'remove' = 'add';
  selectedItem: OrderItem | null = null;
  sendingInvoice = false;
  private destroy$ = new Subject<void>();
  private itemsByServiceCache: { [key: string]: OrderItem[] } = {};

  // Set this to the actual statusId for 'Finished Processing' from your backend
  private readonly finishedProcessingStatusId = 'b8dfb70c-5f5e-11f0-8064-0022481a06a0';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.adjustmentForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      reason: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setCurrentDateTime();
    this.loadOrderDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setCurrentDateTime(): void {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    
    this.adjustmentForm.patchValue({
      date: dateStr,
      time: timeStr
    });
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
          // Initialize status for each item
          if (this.orderDetails?.items) {
            this.orderDetails.items.forEach(item => {
              item.status = 'processing';
            });
          }
          // Clear cache when new data is loaded
          this.itemsByServiceCache = {};
        }
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  openAdjustmentModal(item: OrderItem, type: 'add' | 'remove'): void {
    this.selectedItem = item;
    this.adjustmentType = type;
    this.showAdjustmentModal = true;
    this.setCurrentDateTime();
    this.adjustmentForm.reset();
    this.adjustmentForm.patchValue({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0]
    });
  }

  closeAdjustmentModal(): void {
    this.showAdjustmentModal = false;
    this.selectedItem = null;
    this.adjustmentForm.reset();
  }

  submitAdjustment(): void {
    if (this.adjustmentForm.valid && this.selectedItem) {
      const formData: AdjustmentForm = this.adjustmentForm.value;
      
      // Here you would typically send this data to your backend
      console.log('Adjustment submitted:', {
        item: this.selectedItem,
        type: this.adjustmentType,
        formData: formData
      });

      // Update quantity locally
      if (this.adjustmentType === 'add') {
        this.selectedItem.quantity += 1;
      } else if (this.adjustmentType === 'remove' && this.selectedItem.quantity > 0) {
        this.selectedItem.quantity -= 1;
      }

      // Clear cache and recalculate
      this.itemsByServiceCache = {};
      this.calculateTotalAmount();
      
      this.closeAdjustmentModal();
      this.cdr.markForCheck();
    }
  }

  updateItemStatus(item: OrderItem, status: 'processing' | 'finished'): void {
    item.status = status;
    this.cdr.markForCheck();
  }

  canFinishOrder(): boolean {
    return this.orderDetails?.items.every(item => item.status === 'finished') || false;
  }

  finishProcessing(): void {
    if (!this.orderDetails || !this.canFinishOrder()) return;

    this.processing = true;
    this.cdr.markForCheck();
    
    const laundryId = localStorage.getItem('laundryId');
    const orderId = this.orderDetails.orderId;
    const newStatusId = this.finishedProcessingStatusId;
    console.log('Updating order status with:', { laundryId, orderId, newStatusId });

    if (!laundryId) {
      this.error = 'Laundry ID not found';
      this.processing = false;
      this.cdr.markForCheck();
      return;
    }

    // Use PATCH for updating status
    this.orderService.patchOrderStatus(laundryId, orderId, newStatusId)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.error = 'Failed to update order status. Please try again.';
          this.processing = false;
          this.cdr.markForCheck();
          console.error('Error updating order status:', err);
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          if (this.orderDetails) {
            this.orderDetails.status = 'Finished Processing';
          }
          this.processing = false;
          this.cdr.markForCheck();
          // Navigate back to processing orders after successful update
          this.router.navigate(['/processing-orders']);
        }
      });
  }

  sendInvoice(): void {
    this.sendingInvoice = true;
    this.cdr.markForCheck();
    
    // Simulate invoice sending
    setTimeout(() => {
      this.sendingInvoice = false;
      this.cdr.markForCheck();
      // Here you would typically call your invoice API
      console.log('Invoice sent for order:', this.orderDetails?.orderId);
    }, 2000);
  }

  calculateTotalAmount(): void {
    if (this.orderDetails) {
      this.orderDetails.totalAmount = this.orderDetails.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    }
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

  goBack(): void {
    this.router.navigate(['/laundry/orders']);
  }
} 