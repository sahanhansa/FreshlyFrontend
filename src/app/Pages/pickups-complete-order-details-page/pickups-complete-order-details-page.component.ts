import { Component } from '@angular/core';

import { OrderDetailsHeaderComponent } from '../../Component/order-details-header/order-details-header.component';
import { PickupsCompleteOrderDetailsComponent } from '../../Component/pickups-complete-order-details/pickups-complete-order-details.component';
import { DriverNavbarComponent } from '../../Component/Shared-Components/driver-navbar/driver-navbar.component';
import { FooterComponent } from '../../Component/Shared-Components/footer/footer.component';

@Component({
  selector: 'app-pickups-complete-order-details-page',
  imports: [ OrderDetailsHeaderComponent, 
    PickupsCompleteOrderDetailsComponent,
    DriverNavbarComponent,
    FooterComponent

   ],
   
  templateUrl: './pickups-complete-order-details-page.component.html',
  styleUrl: './pickups-complete-order-details-page.component.css'
})
export class PickupsCompleteOrderDetailsPageComponent {

}
