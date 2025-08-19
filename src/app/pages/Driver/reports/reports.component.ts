import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DriverNavbarComponent } from "@app/components/driver/driver-navbar/driver-navbar.component";
import { FooterComponent } from "@app/components/shared/footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, DriverNavbarComponent, FooterComponent, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  driverId: string | null = localStorage.getItem('userId'); // Or hardcode
  reportData: DriverReportDto | null = null;
  totalRevenue: number | null = null;
  filterOrder: string = '';
  isLoadingReport = false;
  isLoadingRevenue = false;
  isLoadingExport = false;
  errorMessage: string = '';
  constructor(private http: HttpClient, private router: Router) { }
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

  goToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  exportReport(): void {
    this.isLoadingExport = true;
    if (!this.filterOrder) {
      this.errorMessage = 'Please Enter the OrderId to export the report.';
      this.isLoadingExport = false;
      return;
    }

    const apiUrl = `http://localhost:5027/api/driver/generate-reports/${this.filterOrder}`;
    
    this.http.post(apiUrl, null, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${this.filterOrder}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.isLoadingExport = false;
      },
      error: (err) => {
        console.error('Error exporting report:', err);
      }
    });

  }
}
