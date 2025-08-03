import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrderListComponent } from '../../../components/order/pending-order-list/pending-order-list.component';
import { OngoingOrderListComponent } from '../../../components/order/ongoing-order-list/ongoing-order-list.component';
import { ToPayOrderListComponent } from '../../../components/order/to-pay-order-list/to-pay-order-list.component';
import { CompletedOrderListComponent } from '../../../components/order/completed-order-list/completed-order-list.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    PendingOrderListComponent,
    OngoingOrderListComponent,
    ToPayOrderListComponent,
    CompletedOrderListComponent
  ],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent {
  // Property to track which tab is currently active
  activeTab: 'pending' | 'ongoing' | 'toPay' | 'completed' = 'pending';

  // Method to switch between tabs
  setActiveTab(tab: 'pending' | 'ongoing' | 'toPay' | 'completed') {
    this.activeTab = tab;
  }
}