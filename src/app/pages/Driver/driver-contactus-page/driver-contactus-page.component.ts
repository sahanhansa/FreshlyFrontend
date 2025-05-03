import { Component } from '@angular/core';
import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { ContactusHeaderComponent } from "../../../components/driver/contactus-header/contactus-header.component";
import { ContactusComponent } from "../../../components/driver/contactus/contactus.component";
import { FooterComponent } from '../../../components/shared/footer/footer.component';


@Component({
  selector: 'app-driver-contactus-page',
  imports: [DriverNavbarComponent, ContactusHeaderComponent, ContactusComponent, FooterComponent],
  templateUrl: './driver-contactus-page.component.html',
  styleUrl: './driver-contactus-page.component.css'
})
export class DriverContactusPageComponent {

}
