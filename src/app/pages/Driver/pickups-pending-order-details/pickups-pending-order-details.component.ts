import { Component } from '@angular/core';


import { DriverNavbarComponent } from '../../../components/driver/driver-navbar/driver-navbar.component';
import { OrderDetailsHeaderComponent } from '../../../components/driver/order-details-header/order-details-header.component';
import { OrderDetailsPendingComponent } from '../../../components/driver/order-details-pending/order-details-pending.component';
import { PickupQuestionComponent } from '../../../components/driver/pickup-question/pickup-question.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';


@Component({
  selector: 'app-pickups-pending-order-details',
  imports: [DriverNavbarComponent, OrderDetailsHeaderComponent,
           OrderDetailsPendingComponent, PickupQuestionComponent,FooterComponent],
  
  templateUrl: './pickups-pending-order-details.component.html',
  styleUrl: './pickups-pending-order-details.component.css'
})
export class PickupsPendingOrderDetailsComponent {

}
