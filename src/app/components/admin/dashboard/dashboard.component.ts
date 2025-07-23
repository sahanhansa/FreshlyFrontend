import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LaundryRevenueChartComponent } from '../reports/laundry-revenue-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LaundryRevenueChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeCustomers: number = 0;
  totalCustomers: number = 0;

  // Chart data for dashboard
  months: string[] = [];
  laundryRevenueData: { [laundryId: string]: number[] } = {};
  laundryNames: { [laundryId: string]: string } = {};
  selectedLaundryId: string | null = null; // null = all laundries

  // Add admin form fields
  newAdmin: any = {
    Username: '',
    Password: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Role: '',
    profileImage: null
  };
  addAdminError: string = '';
  addAdminSuccess: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchActiveCustomers();
    this.fetchRevenueData();
  }
  fetchRevenueData() {
    this.http.get<any>(`/api/Revenue/Monthly`).subscribe({
      next: (data) => {
        this.months = data.months || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let laundryRevenueData = data.laundryRevenueData || {};
        let laundryNames = data.laundryNames || {};

        // Calculate total revenue for each laundry
        const revenueTotals = Object.entries(laundryRevenueData).map(([id, arr]) => ({
          id,
          total: Array.isArray(arr) ? arr.reduce((sum, v) => sum + (v || 0), 0) : 0
        }));
        // Sort by total revenue descending and take top 10
        const top10 = revenueTotals.sort((a, b) => b.total - a.total).slice(0, 10);
        // Build new objects with only top 10 laundries
        const topLaundryRevenueData: { [laundryId: string]: number[] } = {};
        const topLaundryNames: { [laundryId: string]: string } = {};
        for (const l of top10) {
          topLaundryRevenueData[l.id] = laundryRevenueData[l.id];
          topLaundryNames[l.id] = laundryNames[l.id];
        }
        this.laundryRevenueData = topLaundryRevenueData;
        this.laundryNames = topLaundryNames;
      },
      error: (err: any) => {
        // handle error, optionally set fallback data
      }
    });
  }

  fetchActiveCustomers() {
    this.http.get<any[]>(`/api/Customer`).subscribe({
      next: (customers: any[]) => {
        this.totalCustomers = customers.length;
        this.activeCustomers = customers.filter(c => (c.AccountStatus || '').toLowerCase() === 'active').length;
      },
      error: (err: any) => {
        // handle error
      }
    });
  }

  // Handle file input change
  onProfileImageChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.newAdmin.profileImage = file;
    }
  }

  // Add admin with profile image
  addAdmin() {
    this.addAdminError = '';
    this.addAdminSuccess = '';
    const formData = new FormData();
    formData.append('Username', this.newAdmin.Username);
    formData.append('Password', this.newAdmin.Password);
    formData.append('FirstName', this.newAdmin.FirstName);
    formData.append('LastName', this.newAdmin.LastName);
    formData.append('Email', this.newAdmin.Email);
    formData.append('Role', this.newAdmin.Role);
    if (this.newAdmin.profileImage) {
      formData.append('profileImage', this.newAdmin.profileImage);
    }
    this.http.post('/api/Admin', formData).subscribe({
      next: (res) => {
        this.addAdminSuccess = 'Admin added successfully!';
        // Optionally reset form
        this.newAdmin = {
          Username: '', Password: '', FirstName: '', LastName: '', Email: '', Role: '', profileImage: null
        };
      },
      error: (err) => {
        this.addAdminError = 'Failed to add admin.';
      }
    });
  }
}
