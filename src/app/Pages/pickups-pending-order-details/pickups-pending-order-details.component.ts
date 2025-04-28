import { Component } from '@angular/core';
import { OrderDetailsHeaderComponent } from '../../Component/order-details-header/order-details-header.component';
import { OrderDetailsPendingComponent } from '../../Component/order-details-pending/order-details-pending.component';
import { ConfirmOrderPickupsComponent } from '../../Component/confirm-order-pickups/confirm-order-pickups.component';

import { DriverNavbarComponent } from '../../Component/Shared-Components/driver-navbar/driver-navbar.component';
import { FooterComponent } from "../../Component/Shared-Components/footer/footer.component";

@Component({
  selector: 'app-pickups-pending-order-details',
  imports: [OrderDetailsHeaderComponent,
    OrderDetailsPendingComponent,
    ConfirmOrderPickupsComponent,
    DriverNavbarComponent, FooterComponent],
  templateUrl: './pickups-pending-order-details.component.html',
  styleUrl: './pickups-pending-order-details.component.css'
})
export class PickupsPendingOrderDetailsComponent {

}
