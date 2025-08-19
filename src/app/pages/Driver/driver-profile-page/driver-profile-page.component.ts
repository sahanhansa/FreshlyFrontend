import { Component } from '@angular/core';
import { DriverProfileComponent } from '../../../components/driver/driver-profile/driver-profile.component';
import { ProfileHeaderComponent } from '../../../components/driver/profile-header/profile-header.component';
import { DriverNavbarComponent } from '../../../components/driver/driver-navbar/driver-navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
@Component({
  selector: 'app-driver-profile-page',
  imports: [DriverProfileComponent, ProfileHeaderComponent, DriverNavbarComponent, FooterComponent],
  templateUrl: './driver-profile-page.component.html',
  styleUrls: ['./driver-profile-page.component.css']
})
export class DriverProfilePageComponent {

}
