import { Component } from '@angular/core';
import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { SearchBarComponent } from "../../../components/shared/search-bar/search-bar.component";
import { DeliveryTaskHeaderComponent } from "../../../components/driver/delivery-task-header/delivery-task-header.component";
import { DeliveryOrderCardComponent } from "../../../components/driver/delivery-order-card/delivery-order-card.component";
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";

@Component({
  selector: 'app-delivery-tasks-mainpage',
  imports: [DriverNavbarComponent, SearchBarComponent, DeliveryTaskHeaderComponent, DeliveryOrderCardComponent, PaginationComponent, FooterComponent],
  templateUrl: './delivery-tasks-mainpage.component.html',
  styleUrl: './delivery-tasks-mainpage.component.css'
})
export class DeliveryTasksMainpageComponent {

}
