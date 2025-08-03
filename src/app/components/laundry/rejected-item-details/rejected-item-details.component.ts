import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RejectedItemService } from '../../../services/rejected-item.service';
import { OrderService } from '../../../services/order.service';
import { FooterComponent } from '@app/components/shared/footer/footer.component';

@Component({
  selector: 'app-rejected-item-details',
  templateUrl: './rejected-item-details.component.html',
  imports: [CommonModule, DatePipe, FooterComponent]
})
export class RejectedItemDetailsComponent implements OnInit {
  rejectedItem: any;
  orderDetails: any;
  customerName: string | null = null;
  customerContactNumbers: string[] = [];
  loading = true;
  rejectedBy: string | null = null;
  rejectedAt: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rejectedItemService: RejectedItemService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const laundryId = this.route.snapshot.paramMap.get('laundryId');
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const statusId = this.route.snapshot.paramMap.get('statusId');
    if (laundryId && orderId && statusId) {
      // Load order details
      this.orderService.getModifiedOrderDetailsById(laundryId, orderId, statusId).subscribe(details => {
        if (details.orderDetails) {
          this.orderDetails = details.orderDetails;
          this.customerName = details.customerName || null;
          this.customerContactNumbers = details.customerContactNumbers || [];
        } else {
          this.orderDetails = details;
          this.customerName = null;
          this.customerContactNumbers = [];
        }
        this.loading = false;
      }, () => { this.loading = false; });

      // Load rejected item details to get rejectedBy information
      this.rejectedItemService.getRejectedItemsByLaundryV2(laundryId).subscribe({
        next: (rejectedItems) => {
          // Find the specific rejected item for this order
          const specificRejectedItem = rejectedItems.find(item => 
            item.orderId === orderId && item.statusId === statusId
          );
          if (specificRejectedItem) {
            this.rejectedBy = specificRejectedItem.rejectedBy || null;
            this.rejectedAt = specificRejectedItem.rejectedAt || null;
          }
        },
        error: (err) => {
          console.error('Error loading rejected item details:', err);
        }
      });
    } else {
      this.loading = false;
    }
  }

  goBackToRejectedItems(): void {
    console.log('Navigating back to rejected items');
    this.router.navigate(['/rejected-items']);
  }

  // Method to get status badge styling
  getStatusBadgeClass(status: string): string {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'finished processing':
        return 'bg-blue-200 text-blue-800 border-blue-400';
      case 'processing in laundry':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'order picked up':
      case 'picked up':
        return 'bg-orange-100 text-orange-800 border-orange-400';
      case 'out for delivery':
        return 'bg-purple-100 text-purple-800 border-purple-400';
      case 'order placed':
        return 'bg-gray-100 text-gray-800 border-gray-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-400';
      default:
        return 'bg-gray-200 text-gray-600 border-gray-400';
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