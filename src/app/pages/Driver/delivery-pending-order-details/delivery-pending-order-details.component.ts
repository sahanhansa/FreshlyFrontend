import { Component } from '@angular/core';
import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { DeliveryTaskHeaderComponent } from "../../../components/driver/delivery-task-header/delivery-task-header.component";
import { DeliveryOrderDetailsComponent } from "../../../components/driver/delivery-order-details/delivery-order-details.component";
import { DeliveryQuestion1Component } from "../../../components/driver/delivery-question-1/delivery-question-1.component";
import { DeliveryQuestion2Component } from "../../../components/driver/delivery-question-2/delivery-question-2.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";

@Component({
  selector: 'app-delivery-pending-order-details',
  imports: [DriverNavbarComponent, DeliveryTaskHeaderComponent, DeliveryOrderDetailsComponent, DeliveryQuestion1Component, DeliveryQuestion2Component, FooterComponent],
  templateUrl: './delivery-pending-order-details.component.html',
  styleUrl: './delivery-pending-order-details.component.css'
})
export class DeliveryPendingOrderDetailsComponent {

}
