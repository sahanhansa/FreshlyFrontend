import { Component } from '@angular/core';
import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { DeliveryTaskHeaderComponent } from "../../../components/driver/delivery-task-header/delivery-task-header.component";
import { DeliveryOrderDetailsComponent } from "../../../components/driver/delivery-order-details/delivery-order-details.component";
import { DeliveryQuestion1Component } from "../../../components/driver/delivery-question-1/delivery-question-1.component";
import { DeliveryQuestion2Component } from "../../../components/driver/delivery-question-2/delivery-question-2.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { OrderDetailsHeaderComponent } from "../../../components/driver/order-details-header/order-details-header.component";

@Component({
  selector: 'app-delivery-pending-order-details',
  imports: [DriverNavbarComponent,DeliveryOrderDetailsComponent, DeliveryQuestion1Component, DeliveryQuestion2Component, FooterComponent, OrderDetailsHeaderComponent],
  templateUrl: './delivery-pending-order-details.component.html',
  styleUrl: './delivery-pending-order-details.component.css'
})
export class DeliveryPendingOrderDetailsComponent {

}
