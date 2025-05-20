import { Component } from '@angular/core';


import { DriverNavbarComponent } from '../../../components/driver/driver-navbar/driver-navbar.component';
import { OrderDetailsPendingComponent } from '../../../components/driver/order-details-pending/order-details-pending.component';
import { PickupQuestionComponent } from '../../../components/driver/pickup-question/pickup-question.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { PickupDetailsHeaderComponent } from "../../../components/driver/pickup-details-header/pickup-details-header.component";


@Component({
  selector: 'app-pickups-pending-order-details',
  imports: [DriverNavbarComponent,
    OrderDetailsPendingComponent, PickupQuestionComponent, FooterComponent,  PickupDetailsHeaderComponent],
  
  templateUrl: './pickups-pending-order-details.component.html',
  styleUrl: './pickups-pending-order-details.component.css'
})
export class PickupsPendingOrderDetailsComponent {

}
