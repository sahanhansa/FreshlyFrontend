import { Component } from '@angular/core';

import { OrderCardComponent } from '../../Component/order-card/order-card.component';
import { SearchBarComponent } from '../../Component/Shared-Components/search-bar/search-bar.component';
import { DeliveryTaskHeaderComponent } from '../../Component/delivery-task-header/delivery-task-header.component';
import { DriverNavbarComponent } from "../../Component/Shared-Components/driver-navbar/driver-navbar.component";
import { FooterComponent } from '../../Component/Shared-Components/footer/footer.component';

@Component({
  selector: 'app-delivery-task-mainpage',
  imports: [
    DeliveryTaskHeaderComponent,
    OrderCardComponent,
    SearchBarComponent,
    DriverNavbarComponent,
    FooterComponent
],
  templateUrl: './delivery-task-mainpage.component.html',
  styleUrl: './delivery-task-mainpage.component.css'
})
export class DeliveryTaskMainpageComponent {

}
