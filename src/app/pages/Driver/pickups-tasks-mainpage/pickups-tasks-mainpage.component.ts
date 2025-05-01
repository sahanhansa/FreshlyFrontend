import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 




import { DriverNavbarComponent } from '../../../components/driver/driver-navbar/driver-navbar.component';
import { PickupTasksHeaderComponent } from '../../../components/driver/pickup-tasks-header/pickup-tasks-header.component';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { PickupOrderCardComponent } from '../../../components/driver/pickup-order-card/pickup-order-card.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-pickups-tasks-mainpage',
  imports: [DriverNavbarComponent,
    PickupTasksHeaderComponent,
    PickupOrderCardComponent,
    SearchBarComponent,
    FooterComponent, PaginationComponent,
   ],
  standalone: true,
 
  templateUrl: './pickups-tasks-mainpage.component.html',
  styleUrls: ['./pickups-tasks-mainpage.component.css']
})
export class PickupsTasksMainpageComponent {

}
