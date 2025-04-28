import { Component } from '@angular/core';
import { PickupTasksHeaderComponent } from '../../Component/pickup-tasks-header/pickup-tasks-header.component';
import { OrderCardComponent } from '../../Component/order-card/order-card.component';
import { SearchBarComponent } from '../../Component/Shared-Components/search-bar/search-bar.component';
import { FooterComponent } from '../../Component/Shared-Components/footer/footer.component';

import { DriverNavbarComponent } from '../../Component/Shared-Components/driver-navbar/driver-navbar.component';
@Component({
  selector: 'app-pickups-tasks-mainpage',
  imports: [PickupTasksHeaderComponent,
    OrderCardComponent,
    SearchBarComponent, DriverNavbarComponent,FooterComponent],
  templateUrl: './pickups-tasks-mainpage.component.html',
  styleUrl: './pickups-tasks-mainpage.component.css'
})
export class PickupsTasksMainpageComponent {

}
