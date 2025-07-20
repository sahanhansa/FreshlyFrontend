import { Component, OnInit } from '@angular/core';
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
export class LaundryProfileComponent implements OnInit {
  stats = [
    { title: 'Orders This Month', value: 156 },
    { title: 'Average Rating', value: '⭐ 4.0' },
    { title: 'Revenue', value: '💰 56,950' }
  ];

  // Laundry ID from localStorage
  laundryId: string = '';

  ngOnInit() {
    this.laundryId = localStorage.getItem('laundryId') || '';
    console.log('LaundryProfileComponent - laundryId from localStorage:', this.laundryId);
  }

  logout() {
    console.log('Logging out...');
  }
}
