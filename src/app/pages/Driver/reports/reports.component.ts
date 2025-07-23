import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DriverNavbarComponent } from "@app/components/driver/driver-navbar/driver-navbar.component";
import { FooterComponent } from "@app/components/shared/footer/footer.component";

export interface DriverReportDto {
  totalPickups: number;
  totalDelivery: number;
  pendingOrders: number;
  completedPickups: number;
  completedDelivery: number;
  mostEngagedLaundryName: string;
  mostEngagedLaundryId: string;
  mostEngagedCustomerId: string;
  mostEngagedCustomerName: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, DriverNavbarComponent, FooterComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  driverId: string | null = localStorage.getItem('userId'); // Or hardcode
  reportData: DriverReportDto | null = null;
  totalRevenue: number | null = null;

  isLoadingReport = false;
  isLoadingRevenue = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDriverReport();
    this.fetchTotalRevenue();
  }

  fetchDriverReport(): void {
  if (!this.driverId) {
    console.error('Driver ID not found in localStorage');
    return;
  }

  this.isLoadingReport = true;

  const apiUrl = `http://localhost:5027/api/driver/DriverReportDash/${this.driverId}`;

  this.http.get<DriverReportDto>(apiUrl).subscribe({
    next: (data) => {
      this.reportData = data;
    },
    error: (err) => {
      console.error('Error fetching driver report:', err);
    },
    complete: () => {
      this.isLoadingReport = false;
    }
  });
}


  fetchTotalRevenue(): void {
    if (!this.driverId) {
      console.error('Driver ID not found in localStorage');
      return;
    }

    this.isLoadingRevenue = true;

    const revenueUrl = `http://localhost:5027/api/driver/DriverReportDashRevenue/${this.driverId}`;

    this.http.get<number>(revenueUrl).subscribe({
      next: (data) => {
        this.totalRevenue = data;
      },
      error: (err) => {
        console.error('Error fetching total revenue:', err);
      },
      complete: () => {
        this.isLoadingRevenue = false;
      }
    });
  }
}
