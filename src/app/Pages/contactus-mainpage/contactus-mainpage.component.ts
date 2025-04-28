import { Component } from '@angular/core';
import { DriverNavbarComponent } from '../../Component/Shared-Components/driver-navbar/driver-navbar.component';
import { ContactusHeaderComponent } from '../../Component/contactus-header/contactus-header.component';
import { ContactusComponent, } from '../../Component/contactus/contactus.component';
import { FooterComponent } from "../../Component/Shared-Components/footer/footer.component";

@Component({
  selector: 'app-contactus-mainpage',
  imports: [DriverNavbarComponent,
    ContactusHeaderComponent,
    ContactusComponent, FooterComponent],
  
  templateUrl: './contactus-mainpage.component.html',
  styleUrl: './contactus-mainpage.component.css'
})
export class ContactusMainpageComponent {

}
