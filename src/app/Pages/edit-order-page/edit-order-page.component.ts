import { Component } from '@angular/core';
import { DriverNavbarComponent } from "../../Component/Shared-Components/driver-navbar/driver-navbar.component";
import { EditOrderComponent } from "../../Component/edit-order/edit-order.component";

@Component({
  selector: 'app-edit-order-page',
  imports: [DriverNavbarComponent, EditOrderComponent],
  templateUrl: './edit-order-page.component.html',
  styleUrl: './edit-order-page.component.css'
})
export class EditOrderPageComponent {

}
