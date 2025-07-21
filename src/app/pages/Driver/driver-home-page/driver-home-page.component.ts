import { Component } from '@angular/core';
// import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { DriverHomeComponent } from "../../../components/driver/driver-home/driver-home.component";
import { FooterComponent } from '../../../components/shared/footer/footer.component';

import { DriverNavbarComponent } from "@app/components/driver/driver-navbar/driver-navbar.component";


@Component({
  selector: 'app-driver-home-page',
  imports: [DriverHomeComponent, FooterComponent, DriverNavbarComponent],
  templateUrl: './driver-home-page.component.html',
  styleUrl: './driver-home-page.component.css'
})
export class DriverHomePageComponent {

}
