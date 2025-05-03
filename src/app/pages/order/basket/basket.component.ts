import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarOrderComponent } from '../../../components/order/navbar-order/navbar-order.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { PendingOrderListComponent } from '../../../components/order/pending-order-list/pending-order-list.component';
import { OngoingOrderListComponent } from '../../../components/order/ongoing-order-list/ongoing-order-list.component';
import { PastOrderListComponent } from '../../../components/order/past-order-list/past-order-list.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    PendingOrderListComponent,
    OngoingOrderListComponent,
    PastOrderListComponent,
  ],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent {
  activeTab: 'pending' | 'ongoing' | 'past' = 'pending';

  setActiveTab(tab: 'pending' | 'ongoing' | 'past') {
    this.activeTab = tab;
  }
}