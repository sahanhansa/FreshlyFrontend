import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';
import { OrderService } from '../../../services/order.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() laundryName: string = 'Laundry Name';

  // Order counts
  newOrdersCount: number | null = null;
  processingOrdersCount: number | null = null;
  completedOrdersCount: number | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    // Get the laundry name from localStorage (set during login)
    const storedName = localStorage.getItem('laundryName');
    this.laundryName = storedName ? storedName : 'Laundry Name';
    const laundryId = localStorage.getItem('laundryId');
    if (laundryId) {
      // Status IDs as provided
      const statusIds = {
        new: 'b8dfb629-5f5e-11f0-8064-0022481a06a0',
        processing: 'b8dfb69f-5f5e-11f0-8064-0022481a06a0',
        completed: 'b8dfb7de-5f5e-11f0-8064-0022481a06a0',
      };
      this.subscriptions.push(
        this.orderService.getOrderCountByStatus(laundryId, statusIds.new).subscribe(count => this.newOrdersCount = count),
        this.orderService.getOrderCountByStatus(laundryId, statusIds.processing).subscribe(count => this.processingOrdersCount = count),
        this.orderService.getOrderCountByStatus(laundryId, statusIds.completed).subscribe(count => this.completedOrdersCount = count)
      );
    }
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
