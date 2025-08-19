import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';
import { OrderService } from '../../../services/order.service';
import { RejectedItemService } from '../../../services/rejected-item.service';
import { LaundryService } from '../../../services/laundry.service';
import { Subscription, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() laundryName: string = 'Laundry Name';

  // Order counts
  newOrdersCount: number | null = null;
  processingOrdersCount: number | null = null;
  completedOrdersCount: number | null = null;
  rejectedItemsCount: number | null = null;
  private subscriptions: Subscription[] = [];
  private statusIds: any = null;

  constructor(
    private router: Router, 
    private orderService: OrderService, 
    private rejectedItemService: RejectedItemService,
    private laundryService: LaundryService
  ) {}

  ngOnInit(): void {
    // Get the laundry name from localStorage (set during login)
    const storedName = localStorage.getItem('laundryName');
    this.laundryName = storedName ? storedName : 'Laundry Name';
    const laundryId = localStorage.getItem('laundryId');
    
    if (laundryId) {
      this.loadStatusIdsAndCounts(laundryId);
    }
  }

  private loadStatusIdsAndCounts(laundryId: string): void {
    // First get the status IDs from the API
    this.subscriptions.push(
      this.laundryService.getStatusIds().subscribe({
        next: (statusResponse) => {
          this.statusIds = statusResponse;
          console.log('Loaded status IDs from API:', this.statusIds);
          console.log('New status ID:', this.statusIds.newOrders);
          console.log('Processing status ID:', this.statusIds.processing);
          console.log('Completed status ID:', this.statusIds.completed);
          
          // Now load the order counts using the dynamic status IDs
          if (this.statusIds && this.statusIds.newOrders && this.statusIds.processing && this.statusIds.completed) {
            this.loadOrderCounts(laundryId);
          } else {
            console.error('Some status IDs are missing from API response');
          }
        },
        error: (error) => {
          console.error('Failed to load status IDs from API:', error);
          console.error('Cannot load order counts without status IDs from the API');
          // Reset counts to null since we cannot load them without proper status IDs
          this.newOrdersCount = null;
          this.processingOrdersCount = null;
          this.completedOrdersCount = null;
        }
      })
    );
  }

  private loadOrderCounts(laundryId: string): void {
    // Load order counts based on the dynamic status IDs from API
    this.subscriptions.push(
      this.orderService.getOrderCountByStatus(laundryId, this.statusIds.newOrders).subscribe(count => this.newOrdersCount = count),
      this.orderService.getOrderCountByStatus(laundryId, this.statusIds.processing).subscribe(count => this.processingOrdersCount = count),
      this.orderService.getOrderCountByStatus(laundryId, this.statusIds.completed).subscribe(count => this.completedOrdersCount = count),
      this.rejectedItemService.getRejectedItemsCount(laundryId).subscribe(response => this.rejectedItemsCount = response.rejectedItemCount)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  goToNewOrder() {
    this.router.navigate(['/new-orders']);
  }

   goToProcessingOrder() {
    this.router.navigate(['/processing-orders']);
  }

  goToCompletedOrder() {
    this.router.navigate(['/completed-orders']);
  }

  goToRejectedItems() {
    this.router.navigate(['/rejected-items']);
  }
}
