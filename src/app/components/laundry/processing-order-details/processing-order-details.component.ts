import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { LaundryService } from '../../../services/laundry.service';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Subject, takeUntil, catchError, of } from 'rxjs';
import { RejectedItemService } from '../../../services/rejected-item.service';


interface OrderItem {
  itemName: string;
  quantity: number;
  price: number;
  itemId: string;
  serviceId: string;
  serviceName: string;
  garmentTypeId?: string;
  garmentTypeName?: string;
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
  customerName: string | null = null;
  customerContactNumbers: string[] = [];
  loading = false;
  error: string | null = null;
  processing = false;
  adjustmentForm: FormGroup;
  showAdjustmentModal = false;
  adjustmentType: 'add' | 'remove' = 'add';
  selectedItem: OrderItem | null = null;
  sendingInvoice = false;
  submittingRejection = false;
  showNoteModal = false;
  noteForm: FormGroup;
  private destroy$ = new Subject<void>();
  private itemsByServiceCache: { [key: string]: OrderItem[] } = {};
  emailDetails: any = null; // Store fetched email details
  orderFinishedProcessing = false; // Track if order has been finished processing
  processingSuccessMessage: string | null = null; // Success message after finishing processing
  showSuccessModal = false; // Show success modal for invoice

  // Dynamic status ID for 'Finished Processing' loaded from backend
  private finishedProcessingStatusId: string | null = null;
  public isLoadingStatusIds = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private rejectedItemService: RejectedItemService, // Injected
    private laundryService: LaundryService
  ) {
    this.adjustmentForm = this.fb.group({
      name: ['', Validators.required],
      reason: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.noteForm = this.fb.group({
      note: ['', Validators.required]
    });
  }

  // Method to clear success message after a delay
  private clearSuccessMessage(): void {
    setTimeout(() => {
      this.processingSuccessMessage = null;
      this.cdr.markForCheck();
    }, 5000); // Clear after 5 seconds
  }

  ngOnInit(): void {
    this.setCurrentDateTime();
    this.loadStatusIds();
    this.loadOrderDetails();
  }

  // Method to load status IDs from the backend
  loadStatusIds(): void {
    this.isLoadingStatusIds = true;
    this.laundryService.getNewStatusIds().subscribe({
      next: (statusIds) => {
        this.finishedProcessingStatusId = statusIds.finishedProcessing;
        this.isLoadingStatusIds = false;
        console.log('Status IDs loaded dynamically:', statusIds);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading status IDs:', error);
        this.isLoadingStatusIds = false;
        this.finishedProcessingStatusId = null;
        this.cdr.markForCheck();
      }
    });
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
    this.processingSuccessMessage = null; // Clear success message when loading new details
    this.orderFinishedProcessing = false; // Reset the finished processing flag
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
          this.processingSuccessMessage = null; // Clear success message on error
          this.cdr.markForCheck();
          console.error('Error loading order details:', err);
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          if (data.orderDetails) {
            this.orderDetails = data.orderDetails;
            this.customerName = data.customerName || null;
            this.customerContactNumbers = data.customerContactNumbers || [];
          } else {
            this.orderDetails = data;
            this.customerName = null;
            this.customerContactNumbers = [];
          }
          // Initialize status for each item
          if (this.orderDetails?.items) {
            // Try to load saved statuses from localStorage
            const savedStatuses = this.getSavedStatuses(orderId);
            this.orderDetails.items.forEach(item => {
              if (savedStatuses && savedStatuses[item.itemId]) {
                const savedStatus = savedStatuses[item.itemId];
                if (savedStatus === 'processing' || savedStatus === 'finished') {
                  item.status = savedStatus;
                } else {
                  item.status = 'processing';
                }
              } else {
              item.status = 'processing';
              }
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
      if (this.adjustmentType === 'add') {
        this.selectedItem.quantity += 1;
        this.itemsByServiceCache = {};
        this.calculateTotalAmount();
        this.closeAdjustmentModal();
        this.cdr.markForCheck();
      } else if (this.adjustmentType === 'remove' && this.selectedItem.quantity > 0) {
        // Prepare rejection payload
        const laundryId = localStorage.getItem('laundryId');
        const orderId = this.orderDetails?.orderId;
        const itemId = this.selectedItem?.itemId;
        const serviceId = this.selectedItem?.serviceId;
        const rejectedBy = formData.name || localStorage.getItem('laundryName') || 'Laundry';
        const rejectedAt = new Date().toISOString();
        // Debug logging
        console.log('Rejection debug:', { laundryId, orderId, itemId, serviceId });
        if (!laundryId) {
          this.error = 'Laundry ID not found.';
          console.error('Laundry ID not found.');
          this.submittingRejection = false;
          return;
      }
        if (!orderId || !itemId || !serviceId) {
          this.error = 'Missing order or item information.';
          console.error('Missing order or item information:', { orderId, itemId, serviceId });
          this.submittingRejection = false;
          return;
        }
        const payload = {
          orderId: orderId,
          itemId: itemId,
          serviceId: serviceId,
          itemName: this.selectedItem.itemName,
          quantity: 1, // Always 1 for a single reduction
          reason: formData.reason,
          rejectedBy: rejectedBy,
          rejectedAt: rejectedAt
        };
        console.log('Rejection payload:', payload);
        this.submittingRejection = true;
        this.rejectedItemService.postRejectedItemByLaundry(laundryId, payload).subscribe({
          next: () => {
            this.selectedItem!.quantity -= 1;
      this.itemsByServiceCache = {};
      this.calculateTotalAmount();
      this.closeAdjustmentModal();
            this.submittingRejection = false;
            this.cdr.markForCheck();
          },
          error: (err) => {
            this.error = 'Failed to reject item. Please try again.';
            console.error('Rejection API error:', err);
            this.submittingRejection = false;
      this.cdr.markForCheck();
          }
        });
      }
    } else {
      this.submittingRejection = false;
    }
  }

  updateItemStatus(item: OrderItem, status: 'processing' | 'finished'): void {
    item.status = status;
    this.saveStatusesToLocalStorage();
    this.cdr.markForCheck();
  }

  saveStatusesToLocalStorage(): void {
    if (!this.orderDetails) return;
    const orderId = this.orderDetails.orderId;
    const statuses: { [itemId: string]: string } = {};
    this.orderDetails.items.forEach(item => {
      const status = item.status;
      statuses[item.itemId] = (status === 'processing' || status === 'finished') ? status : 'processing';
    });
    localStorage.setItem(`processingOrderStatus-${orderId}`, JSON.stringify(statuses));
  }

  getSavedStatuses(orderId: string | null): { [itemId: string]: string } | null {
    if (!orderId) return null;
    const data = localStorage.getItem(`processingOrderStatus-${orderId}`);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    return null;
  }

  canFinishOrder(): boolean {
    // Check if status IDs are loaded and all items are finished
    return this.finishedProcessingStatusId !== null && 
           (this.orderDetails?.items.every(item => item.status === 'finished') || false);
  }

  finishProcessing(): void {
    if (!this.orderDetails || !this.canFinishOrder()) return;

    // Check if status ID is loaded
    if (!this.finishedProcessingStatusId) {
      this.error = 'Status information not loaded. Please try again.';
      this.cdr.markForCheck();
      return;
    }

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
          this.processingSuccessMessage = null; // Clear success message on error
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
          // Set the flag to indicate order has been finished processing
          this.orderFinishedProcessing = true;
          // Clear saved statuses from localStorage
          localStorage.removeItem(`processingOrderStatus-${orderId}`);
          // Fetch email details for invoice
          this.orderService.getEmailDetails(laundryId, orderId).subscribe({
            next: (details) => {
              this.emailDetails = details;
              this.processing = false;
              this.processingSuccessMessage = 'Order processing completed successfully! You can now send the invoice.';
              this.cdr.markForCheck();
              this.clearSuccessMessage(); // Clear the message after 5 seconds
              // Optionally show a success message
            },
            error: (err) => {
              this.error = 'Order status updated, but failed to fetch email details.';
              this.processing = false;
              this.processingSuccessMessage = null; // Clear success message on error
              this.cdr.markForCheck();
            }
          });
        }
      });
  }

  sendInvoice(): void {
    if (!this.emailDetails) {
      this.error = 'Email details not loaded. Please finish processing first.';
      this.cdr.markForCheck();
      return;
    }
    this.sendingInvoice = true;
    this.cdr.markForCheck();

    // Build the items table HTML
    const itemsRows = this.emailDetails.items.map((item: any) => `
      <tr>
        <td>${item.itemName}</td>
        <td>${item.garmentTypeName || ''}</td>
        <td>${item.quantity}</td>
        <td>Rs. ${item.price}</td>
        <td>Rs. ${item.price * item.quantity}</td>
      </tr>
    `).join('');
    const itemsTable = `
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Garment Type</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
    `;

    // Email HTML template with placeholders replaced
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Details</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #333; padding: 20px; min-height: 100vh; }
        .container { background: #fff; padding: 40px; border-radius: 16px; max-width: 700px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.1); position: relative; overflow: hidden; }
        .container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0; }
        h2 { color: #667eea; font-size: 32px; font-weight: 600; margin-bottom: 8px; }
        .subtitle { color: #888; font-size: 16px; }
        .order-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .info-card { background: #f8f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #667eea; transition: transform 0.2s ease; }
        .info-card:hover { transform: translateY(-2px); }
        .info-label { font-weight: 600; color: #555; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .info-value { font-size: 18px; color: #333; font-weight: 500; }
        .total-amount { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-left: none; }
        .total-amount .info-label { color: rgba(255,255,255,0.9); }
        .total-amount .info-value { color: white; font-size: 24px; font-weight: 700; }
        h3 { color: #333; font-size: 24px; margin-bottom: 20px; font-weight: 600; }
        .items-section { margin-bottom: 40px; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        th { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 16px; text-align: left; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { padding: 16px; text-align: left; border-bottom: 1px solid #f0f0f0; transition: background-color 0.2s ease; }
        tr:hover td { background-color: #f8f9ff; }
        tr:last-child td { border-bottom: none; }
        .footer { margin-top: 40px; font-size: 14px; color: #888; text-align: center; padding-top: 20px; border-top: 1px solid #f0f0f0; }
        .company-name { color: #667eea; font-weight: 600; }
        @media (max-width: 768px) { .container { padding: 20px; margin: 10px; } .order-info { grid-template-columns: 1fr; } h2 { font-size: 24px; } table { font-size: 14px; } th, td { padding: 12px 8px; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Order Details</h2>
            <p class="subtitle">Thank you for choosing our laundry service</p>
        </div>
        <div class="order-info">
            <div class="info-card">
                <div class="info-label">Customer Name</div>
                <div class="info-value">${this.emailDetails.customerName}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Laundry Name</div>
                <div class="info-value">${this.emailDetails.laundryName}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Order ID</div>
                <div class="info-value">${this.emailDetails.orderId}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Laundry ID</div>
                <div class="info-value">${this.emailDetails.laundryId}</div>
            </div>
            <div class="info-card total-amount">
                <div class="info-label">Total Amount</div>
                <div class="info-value">Rs. ${this.emailDetails.totalAmount}</div>
            </div>
        </div>
        <div class="items-section">
            <h3>Items</h3>
            ${itemsTable}
        </div>
        <div class="footer">
            &copy; 2024 <span class="company-name">Freshly</span>. All rights reserved.
        </div>
    </div>
</body>
</html>
    `;

    const payload = {
      toEmail: this.emailDetails.customerEmail,
      subject: `Invoice for Order #${this.emailDetails.orderId}`,
      body: htmlBody,
      isHtml: true,
      emailDetails: this.emailDetails
    };
    this.orderService.sendInvoiceEmail(payload).subscribe({
      next: () => {
        this.sendingInvoice = false;
        this.showSuccessModal = true;
        this.cdr.markForCheck();
        
        // Close modal and navigate back after 2 seconds
        setTimeout(() => {
          this.showSuccessModal = false;
          this.cdr.markForCheck();
          this.router.navigate(['/processing-orders']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Failed to send invoice email.';
        this.sendingInvoice = false;
        this.cdr.markForCheck();
      }
    });
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
        this.router.navigate(['/processing-orders']);
    }
  }

  get noteKey(): string | null {
    return this.orderDetails ? `orderId: ${this.orderDetails.orderId}` : null;
  }

  get hasNote(): boolean {
    if (!this.noteKey) return false;
    return !!localStorage.getItem(this.noteKey);
  }

  openNoteModal(): void {
    this.showNoteModal = true;
    this.noteForm.reset();
    // Prefill note if exists
    if (this.noteKey) {
      const existingNote = localStorage.getItem(this.noteKey);
      if (existingNote) {
        this.noteForm.patchValue({ note: existingNote });
      }
    }
  }

  closeNoteModal(): void {
    this.showNoteModal = false;
    this.noteForm.reset();
  }

  submitNote(): void {
    if (this.noteForm.valid && this.orderDetails) {
      const note = this.noteForm.value.note;
      const orderId = this.orderDetails.orderId;
      localStorage.setItem(`orderId: ${orderId}`, note);
      this.closeNoteModal();
    }
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
} 