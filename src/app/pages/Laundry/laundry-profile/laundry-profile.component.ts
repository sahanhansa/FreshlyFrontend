import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '@app/components/laundry/stats-card/stats-card.component';
import { LaundryDetailsCardComponent } from '@app/components/laundry/laundry-details-card/laundry-details-card.component';
import { OwnerDetailsCardComponent } from '@app/components/laundry/owner-details-card/owner-details-card.component';
import { AccessNoticeComponent } from '@app/components/laundry/access-notice/access-notice.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import type { StatsCardStat } from '@app/components/laundry/stats-card/stats-card.component';


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
  stats: StatsCardStat[] = [
    { title: 'Order Count', value: 0 },
    { title: 'Average Rating', value: { rating: 0, max: 5 } },
    { title: 'Revenue', value: 'LKR 0' }
  ];

  // Laundry ID from localStorage
  laundryId: string = '';

  // Add property for real order count
  orderCount: number | null = null;
  // Add property for real average rating
  averageRating: number = 0;
  maxRating: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.laundryId = localStorage.getItem('laundryId') || '';
    console.log('LaundryProfileComponent - laundryId from localStorage:', this.laundryId);
    if (this.laundryId) {
      this.fetchAverageRating();
      this.fetchRevenue();
    }
  }

  // Fetch average rating from API
  fetchAverageRating() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${environment.apiUrl}/api/Profile/average-rating/${this.laundryId}`;
    this.http.get<{ laundryId: string, averageRating: number, maxRating: number }>(url, { headers })
      .subscribe(data => {
        this.averageRating = data.averageRating;
        this.maxRating = data.maxRating;
        // Update stats array
        this.stats = [
          this.stats[0],
          { title: 'Average Rating', value: { rating: data.averageRating, max: data.maxRating } },
          this.stats[2]
        ];
      });
  }

  // Fetch revenue from API
  fetchRevenue() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${environment.apiUrl}/api/Profile/revenue/${this.laundryId}`;
    this.http.get<{ laundryId: string, revenue: number }>(url, { headers })
      .subscribe(data => {
        const formatted = 'LKR ' + data.revenue.toLocaleString('en-US');
        this.stats = [
          this.stats[0],
          this.stats[1],
          { title: 'Revenue', value: formatted }
        ];
      });
  }

  // Handler for order count emitted from child
  onOrderCountChanged(count: number) {
    this.orderCount = count;
    // Update stats array
    this.stats = [
      { title: 'Order Count', value: count },
      this.stats[1],
      this.stats[2]
    ];
  }

  logout() {
    console.log('Logging out...');
  }
}
