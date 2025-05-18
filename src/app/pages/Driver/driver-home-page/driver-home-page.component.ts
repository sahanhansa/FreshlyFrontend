import { Component } from '@angular/core';

import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { DriverHomeComponent } from "../../../components/driver/driver-home/driver-home.component";
import { FooterComponent } from '../../../components/shared/footer/footer.component';



@Component({
  selector: 'app-driver-home-page',
  imports: [DriverNavbarComponent, DriverHomeComponent, FooterComponent],
  templateUrl: './driver-home-page.component.html',
  styleUrl: './driver-home-page.component.css'
})
export class DriverHomePageComponent {

}
