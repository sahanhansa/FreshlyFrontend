// ...existing code...
// Angular core imports for component, lifecycle hooks, and DOM access
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Import interfaces for type safety
import { AdminStats, AdminPanelMember, Laundry, Driver, PendingAction } from '../../../models/admin.interface';
import { AdminDriverService } from '../../../services/admin/admin-driver.service';
import { LaundryService } from '../../../services/laundry.service';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration
} from 'chart.js';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from "@app/components/shared/navbar/navbar.component";


// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);
//Component decorator with metadata
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, NavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  orders: any[] = [];
  laundryRevenueData: { [laundryId: string]: number[] } = {};
  laundryNames: { [laundryId: string]: string } = {};
  private chartInstance: Chart | null = null;
  @ViewChild('revenueChart') private revenueChart!: ElementRef<HTMLCanvasElement>;

  adminName: string = '';
  laundries: Laundry[] = [];
  customers: any[] = [];
  stats: AdminStats = {
    totalPickups: 0,
    totalDeliveries: 0,
    totalHours: 0,
    totalRevenue: 0,
    activeUsers: 0
  };
  adminPanel: AdminPanelMember[] = [
    { id: 1, name: 'Lahiru Gayantha', role: 'Chief Executive Officer', image: 'assets/images/admin1.jpg' },
    { id: 2, name: 'Chamal Silva', role: 'Chief Technical Officer', image: 'assets/images/admin2.jpg' },
    { id: 3, name: 'Upeksha Udayaratne', role: 'Chief Financial Officer', image: 'assets/images/admin3.jpg' },
    { id: 4, name: 'Chamini Lakeesha', role: 'Human Resources', image: 'assets/images/admin4.jpg' },
    { id: 5, name: 'Vidura Wijesekara', role: 'Chief Marketing Officer', image: 'assets/images/admin5.jpg' }
  ];
  drivers: Driver[] = [];
  pendingActions: PendingAction[] = [
    { type: 'pickup', count: 5 },
    { type: 'delivery', count: 8 }
  ];
  revenueData = {
    monthlyIncome: [32000, 43000, 33000, 60000, 57000, 58753, 58000, 57000, 38000, 32667, 58000, 60000]
  };
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  statusMap: { [id: string]: string } = {};

  constructor(
    private router: Router,
    private laundryService: LaundryService,
    private driverService: AdminDriverService,
    private http: HttpClient
  ) {
    const storedName = localStorage.getItem('adminUsername');
    this.adminName = storedName ? storedName : 'Customer';
  }

  ngOnInit(): void {
    console.log('AdminDashboardComponent: ngOnInit');
    // Fetch statuses first
    this.http.get<any[]>(`${environment.apiUrl}/api/Status`).subscribe({
      next: (statuses: any[]) => {
        this.statusMap = {};
        statuses.forEach((status: any) => {
          this.statusMap[status.StatusID || status.statusId] = status.StatusName || status.statusName;
        });
        // Fetch laundries after statuses
        this.laundryService.getLaundries().subscribe({
          next: (laundries: any[]) => {
            this.laundries = laundries.map((laundry: any) => ({
              id: laundry.id || laundry.laundryId || '',
              name: laundry.name || laundry.laundryName || 'Unnamed Laundry',
              location: laundry.location || laundry.city || 'Location not available',
              rating: laundry.rating || laundry.averageRating || 0,
              logo: 'assets/images/laundry.png',
              accountStatus: laundry.accountStatus || laundry.status || ''
            }));
            this.laundries.forEach((laundry: any) => {
              this.laundryNames[laundry.id] = laundry.name;
            });
            this.updateActiveUsers();
            // Fetch orders after laundries
            this.fetchOrdersAndProcessRevenue();
          },
          error: (err: any) => {
            console.error('Failed to fetch laundries:', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to fetch statuses:', err);
      }
    });

    this.driverService.getDrivers().subscribe({
      next: (drivers: any[]) => {
        this.drivers = drivers.map((driver: any) => ({
          id: driver.driverId || '',
          name: driver.name || driver.fullName || 'Unnamed Driver',
          location: driver.address?.city || 'Location not available',
          rating: driver.rating || 0,
          photo: driver.profileImageUrl || 'assets/images/driver.png',
          accountStatus: driver.accountStatus || driver.status || ''
        }));
        this.updateActiveUsers();
      },
      error: (err: any) => {
        console.error('Failed to fetch drivers:', err);
      }
    });

    // Fetch customers for active users
    this.http.get<any[]>(`${environment.apiUrl}/api/Customer`).subscribe({
      next: (customers: any[]) => {
        this.customers = customers.map((customer: any) => ({
          ...customer,
          accountStatus: customer.accountStatus || customer.status || ''
        }));
        this.updateActiveUsers();
      },
      error: (err: any) => {
        console.error('Failed to fetch customers:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    // Required by AfterViewInit interface. Chart is initialized after data loads.
  }

  private updateActiveUsers(): void {
    // Aggregate active users from customers, drivers, laundries
    const activeCustomers = this.customers?.filter((c: any) => (c.accountStatus || '').toLowerCase() === 'active').length || 0;
    const activeDrivers = this.drivers?.filter((d: any) => (d.accountStatus || '').toLowerCase() === 'active').length || 0;
    const activeLaundries = this.laundries?.filter((l: any) => (l.accountStatus || '').toLowerCase() === 'active').length || 0;
    this.stats.activeUsers = activeCustomers + activeDrivers + activeLaundries;
  }

  private initializeChart(): void {
    if (!this.revenueChart) return;
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    if (!ctx) return;
    // Prepare datasets for Chart.js
    const datasets = Object.keys(this.laundryRevenueData).map((laundryId, idx) => {
      const color = idx % 2 === 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)';
      const bgColor = idx % 2 === 0 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)';
      return {
        label: this.laundryNames[laundryId] || `Laundry ${laundryId}`,
        data: this.laundryRevenueData[laundryId],
        borderColor: color,
        backgroundColor: bgColor,
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6
      };
    });
    console.log('Chart datasets:', datasets);
    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.months,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Revenue by Laundry'
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (Rs)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    };
    try {
      this.chartInstance = new Chart(ctx, chartConfig);
    } catch (error) {
      console.error('Error creating Chart.js chart:', error);
    }
  }

  private fetchOrdersAndProcessRevenue(): void {
    this.http.get<any[]>(`${environment.apiUrl}/api/Order`).subscribe({
      next: (orders: any[]) => {
        console.log('Fetched orders:', orders);
        this.orders = orders;
        this.processMonthlyRevenue();
        this.initializeChart();
        // Count pickups and deliveries using order.status.statusDisplayName or statusName (trimmed)
        let pickupCount = 0;
        let deliveryCount = 0;
        orders.forEach(order => {
          const statusRaw = order.status?.statusDisplayName || order.status?.statusName || '';
          const statusName = statusRaw.trim().toLowerCase();
          if (statusName === 'order picked up' || statusName === 'out for delivery') {
            pickupCount++;
          }
          if (statusName === 'delivered') {
            deliveryCount++;
          }
        });
        this.stats.totalPickups = pickupCount;
        this.stats.totalDeliveries = deliveryCount;
        // Calculate total revenue
        this.stats.totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalCost || 0), 0);
        // Calculate total hours (difference between placedDateTime and pickupDateTime for all orders)
        let totalHours = 0;
        orders.forEach(order => {
          const placed = order.placedDateTime ? new Date(order.placedDateTime) : null;
          const pickup = order.pickupDate && order.pickupTime ? new Date(order.pickupDate + 'T' + order.pickupTime) : null;
          if (placed && pickup && pickup > placed) {
            const diffMs = pickup.getTime() - placed.getTime();
            totalHours += diffMs / (1000 * 60 * 60);
          }
        });
        this.stats.totalHours = Math.round(totalHours);
      },
      error: (err: any) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  }

  private processMonthlyRevenue(): void {
    // Prepare monthly revenue for each laundry
    this.laundryRevenueData = {};
    // Initialize arrays for each laundry
    this.laundries.forEach((laundry: any) => {
      this.laundryRevenueData[laundry.id] = Array(12).fill(0);
    });
    // Process each order
    this.orders.forEach((order: any) => {
      // Use correct fields from API response
      const laundryId = order.laundry?.laundryId;
      const total = order.totalCost;
      const dateStr = order.placedDate || order.placedDateTime;
      if (!laundryId || total == null || !dateStr) return;
      const date = new Date(dateStr);
      const month = date.getMonth(); // 0-based
      if (this.laundryRevenueData[laundryId]) {
        this.laundryRevenueData[laundryId][month] += Number(total);
      }
    });
  }
}