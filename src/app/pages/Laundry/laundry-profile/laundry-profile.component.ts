import { Component } from '@angular/core';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '@app/components/laundry/stats-card/stats-card.component';
import { LaundryDetailsCardComponent } from '@app/components/laundry/laundry-details-card/laundry-details-card.component';
import { OwnerDetailsCardComponent } from '@app/components/laundry/owner-details-card/owner-details-card.component';
import { AccessNoticeComponent } from '@app/components/laundry/access-notice/access-notice.component';


@Component({
  selector: 'app-laundry-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    StatsCardComponent,
    LaundryDetailsCardComponent,
    OwnerDetailsCardComponent,
    AccessNoticeComponent,

],
  templateUrl: './laundry-profile.component.html',

})
export class LaundryProfileComponent {
  stats = [
    { title: 'Orders This Month', value: 156 },
    { title: 'Average Rating', value: '⭐ 4.0' },
    { title: 'Revenue', value: '💰 56,950' }
  ];

  laundry = {
    name: 'FreshFold Laundry',
    tagline: 'Freshness, Convenience, and Quality in Every Fold',
    regNo: '1345',
    address: 'No 25, Galle Road, Colombo 03, Sri Lanka',
    contact: '+94 71 234 5678',
    email: 'info@freshfoldlaundry.lk',
    hours: 'Monday to Saturday: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 5:00 PM',
    services: 'Washing, drying, and folding\nDry cleaning\nIroning\nPickup and delivery'
  };

  owner = {
    name: 'John Doe',
    address: 'No 25, Galle Road, Colombo 03, Sri Lanka',
    contact: '+94 71 234 5678',
    email: 'info@freshfoldlaundry.lk'
  };

  logout() {
    console.log('Logging out...');
  }
}
