
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment'
import {HeaderComponent} from './header.component'
import {FooterComponent} from '../shared/footer/footer.component'

interface TableCounts {
  customerCount: number;
  laundryCount: number;
  orderCount: number;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  bubbles = Array(10).fill(0); // For soap bubbles animation
  processSteps = [
    {
      stepLabel: 'STEP 01',
      title: 'Schedule a Pickup',
      imagePath: 'assets/images/landing/Address.png',
    },
    {
      stepLabel: 'STEP 02',
      title: 'We Collect',
      imagePath: 'assets/images/landing/2.png',
    },
    {
      stepLabel: 'STEP 03',
      title: 'Wash & Dry',
      imagePath: 'assets/images/landing/3.png',
    },
    {
      stepLabel: 'STEP 04',
      title: 'Delivered',
      imagePath: 'assets/images/landing/4.png',
    },
  ];
  stats = [
    { number: '0', label: 'Happy Customers' },
    { number: '0', label: 'Laundry Partners' },
    { number: '0', label: 'Orders Completed' },
  ];
  businessBenefits = [
    { text: 'Reach more customers', iconClass: 'icon-reach' },
    { text: 'Streamlined operations', iconClass: 'icon-streamline' },
    { text: 'Grow your business', iconClass: 'icon-grow' },
  ];
  error: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTableCounts();
  }

  loadTableCounts(): void {
    this.http.get<TableCounts>(`${environment.apiUrl}/api/Basic/counts`).subscribe({
      next: (data) => {
        this.stats = [
          { number: data.customerCount.toString(), label: 'Happy Customers' },
          { number: data.laundryCount.toString(), label: 'Laundry Partners' },
          { number: data.orderCount.toString(), label: 'Orders Completed' },
        ];
      },
      error: (err) => {
        this.error = 'Failed to load statistics';
        console.error('Error fetching table counts:', err);
      },
    });
  }

  goTo(route: string, queryParam: string): void {
    this.router.navigate([route], { queryParams: { type: queryParam } });
  }
}
