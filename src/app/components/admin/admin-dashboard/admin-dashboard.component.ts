// ...existing code...
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RevenuePerMonthComponent } from '../reports/revenue-per-month.component';

// Angular core imports for component, lifecycle hooks, and DOM access
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
// Import interfaces for type safety
import { AdminStats, AdminPanelMember, Laundry, Driver, PendingAction } from '../../../models/admin.interface';
import { AdminDriverService } from '../../../services/admin/admin-driver.service';
import { LaundryService } from '../../../services/laundry.service';
import { LaundryAdminService } from '../../../services/laundry-admin.service';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartConfiguration } from 'chart.js';
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
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule, RevenuePerMonthComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  deleteAdmin(member: AdminPanelMember): void {
    if (!member.id) {
      alert('Invalid admin ID.');
      return;
    }
    if (!confirm('Are you sure you want to delete this admin?')) {
      return;
    }
    const token = localStorage.getItem('token');
    this.http.delete(`${environment.apiUrl}/api/Admin/delete-if-not-superadmin/${member.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.adminPanel = this.adminPanel.filter(a => a.id !== member.id);
        alert('Admin deleted successfully.');
      },
      error: (err) => {
        let msg = 'Failed to delete admin.';
        if (err?.error && typeof err.error === 'string') {
          msg = err.error;
        }
        alert(msg);
        console.error('Failed to delete admin:', err);
      }
    });
  }
  showAdminEmail(member: AdminPanelMember): void {
    alert(member.email ? member.email : 'No email available for this admin.');
  }
  addAdminError: string | null = null;
  // Loading spinner flags
  isLoadingAdmins: boolean = false;
  isLoadingStatuses: boolean = false;
  isLoadingLaundries: boolean = false;
  isLoadingDrivers: boolean = false;
  isLoadingCustomers: boolean = false;
  isLoadingOrders: boolean = false;
  @ViewChild('revenuePerMonthComp', { static: false }) revenuePerMonthComp?: RevenuePerMonthComponent;
  private viewReady = false;
  private dataReady = false;
  downloadReport() {
    setTimeout(() => {
      const doc = new jsPDF('p', 'mm', 'a4');
      let y = 10;
      doc.setFontSize(18);
      doc.text('Total Revenue Report', 14, y);
      y += 10;

      // Only add total revenue chart from RevenuePerMonthComponent
      if (this.revenuePerMonthComp?.getChartImage) {
        const totalRevenueImg = this.revenuePerMonthComp.getChartImage();
        if (totalRevenueImg) {
          doc.setFontSize(16);
          doc.text('Total Revenue Per Month', 14, y);
          y += 6;
          doc.addImage(totalRevenueImg, 'PNG', 14, y, 180, 60);
          y += 65;
        }
      }

      // Save the PDF
      doc.save(`TotalRevenueReport_${new Date().toISOString().slice(0, 10)}.pdf`);
    }, 500);
  }
  adminRole: string = '';
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
  adminPanel: AdminPanelMember[] = [];
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
  showAddAdminForm: boolean = false;

  // Property to hold the selected profile image file
  profileImageFile: File | null = null;

  constructor(
    private router: Router,
    private laundryService: LaundryService,
    private laundryAdminService: LaundryAdminService,
    private driverService: AdminDriverService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    const storedName = localStorage.getItem('adminUsername');
    this.adminName = storedName ? storedName : 'Customer';
    // Get role from localStorage if available
    const storedRole = localStorage.getItem('adminRole');
    this.adminRole = storedRole ? storedRole : '';
  }

  // Handler for file input change event
  onProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImageFile = input.files[0];
    } else {
      this.profileImageFile = null;
    }
  }

  ngOnInit(): void {
    // Fetch all admins from backend
    const token = localStorage.getItem('token');
    this.isLoadingAdmins = true;
    this.http.get<any[]>(`${environment.apiUrl}/api/Admin`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (admins: any[]) => {
        this.adminPanel = admins.map((admin: any) => ({
          id: admin.id || admin.adminId || '',
          name: admin.name || admin.username || '',
          role: admin.role || '',
          image: admin.laundryImageLink || admin.image || 'assets/images/admin.jpg',
          email: admin.email || ''
        }));
        this.isLoadingAdmins = false;
      },
      error: (err) => {
        console.error('Failed to fetch admins:', err);
        this.isLoadingAdmins = false;
      }
    });

    // Fetch statuses first
    this.isLoadingStatuses = true;
    this.http.get<any[]>(`${environment.apiUrl}/api/Status`).subscribe({
      next: (statuses: any[]) => {
        this.statusMap = {};
        statuses.forEach((status: any) => {
          this.statusMap[status.StatusID || status.statusId] = status.StatusName || status.statusName;
        });
        this.isLoadingStatuses = false;
        // Fetch laundries after statuses
        this.isLoadingLaundries = true;
        this.laundryAdminService.getLaundries().subscribe({
          next: (laundries: any[]) => {
            this.laundries = laundries.map((laundry: any) => ({
              id: laundry.laundryId || '',
              name: laundry.laundryName || 'Unnamed Laundry',
              location: laundry.fullAddress || 'Location not available',
              rating: laundry.averageRating || 0,
              logo: laundry.profilePic || 'assets/images/laundry.png',
              accountStatus: laundry.accountStatus || ''
            }));
            this.laundries.forEach((laundry: any) => {
              this.laundryNames[laundry.id] = laundry.name;
            });
            this.updateActiveUsers();
            this.isLoadingLaundries = false;
            // Fetch orders after laundries
            this.fetchOrdersAndProcessRevenue();
          },
          error: (err: any) => {
            console.error('Failed to fetch laundries:', err);
            this.isLoadingLaundries = false;
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to fetch statuses:', err);
        this.isLoadingStatuses = false;
      }
    });

    this.isLoadingDrivers = true;
    this.driverService.getDrivers().subscribe({
      next: (drivers: any[]) => {
        this.drivers = drivers.map((driver: any) => ({
          id: driver.driverId || '',
          name: (driver.firstName ? driver.firstName : '') + (driver.lastName ? ' ' + driver.lastName : ''),
          email: driver.email || '',
          photo: driver.profileImage || 'assets/images/driver.png',
          accountStatus: driver.accountStatus || driver.status || '',
          rating: driver.rating || 0,
          location: driver.address?.city || driver.city || ''
        }));
        this.updateActiveUsers();
        this.isLoadingDrivers = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch drivers:', err);
        this.isLoadingDrivers = false;
      }
    });

    // Fetch customers for active users
    this.isLoadingCustomers = true;
    this.http.get<any[]>(`${environment.apiUrl}/api/Customer`).subscribe({
      next: (customers: any[]) => {
        this.customers = customers.map((customer: any) => ({
          ...customer,
          accountStatus: customer.accountStatus || customer.status || ''
        }));
        this.updateActiveUsers();
        this.isLoadingCustomers = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch customers:', err);
        this.isLoadingCustomers = false;
      }
    });
  }

  ngAfterViewInit(): void {
    // Mark view as ready and try to render chart
    this.viewReady = true;
    this.tryRenderChart();
  }

  private tryRenderChart(): void {
    // Only render chart if both view and data are ready and orders are loaded
    if (this.viewReady && this.dataReady && this.orders && this.orders.length > 0) {
      // If the ViewChild is not yet available, retry after a short delay
      if (!this.revenueChart || !this.revenueChart.nativeElement) {
        console.warn('revenueChart ViewChild not available, retrying in 100ms');
        setTimeout(() => this.tryRenderChart(), 100);
        return;
      }
      this.initializeChart();
    }
  }

  private updateActiveUsers(): void {
    // Aggregate active users from customers, drivers, laundries
    const activeCustomers = this.customers?.filter((c: any) => (c.accountStatus || '').toLowerCase() === 'active').length || 0;
    const activeDrivers = this.drivers?.filter((d: any) => (d.accountStatus || '').toLowerCase() === 'active').length || 0;
    const activeLaundries = this.laundries?.filter((l: any) => (l.accountStatus || '').toLowerCase() === 'active').length || 0;
    this.stats.activeUsers = activeCustomers + activeDrivers + activeLaundries;
  }

  private initializeChart(): void {
    if (!this.revenueChart || !this.revenueChart.nativeElement) {
      console.warn('revenueChart ViewChild not available');
      return;
    }
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.warn('2D context not available on revenueChart');
      return;
    }
    // Destroy previous chart instance if exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
    // Vibrant color palette for unique, consistent curve colors
    const colorPalette = [
      '#1f77b4', // blue
      '#ff7f0e', // orange
      '#2ca02c', // green
      '#d62728', // red
      '#9467bd', // purple
      '#8c564b', // brown
      '#e377c2', // pink
      '#7f7f7f', // gray
      '#bcbd22', // yellow-green
      '#17becf'  // cyan
    ];
    const datasets = Object.keys(this.laundryRevenueData).map((laundryId, idx) => {
      const color = colorPalette[idx % colorPalette.length];
      const bgColor = color + '33'; // 20% opacity for background
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
    // Debug: log datasets and laundryRevenueData
    console.log('Chart datasets:', datasets, 'laundryRevenueData:', this.laundryRevenueData);
    if (!datasets.length || datasets.every(ds => !ds.data || ds.data.every((v: any) => !v))) {
      // Show a message in the chart area if no data
      const ctx = this.revenueChart.nativeElement.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.revenueChart.nativeElement.width, this.revenueChart.nativeElement.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#888';
        ctx.textAlign = 'center';
        ctx.fillText('No revenue data to display', this.revenueChart.nativeElement.width / 2, this.revenueChart.nativeElement.height / 2);
      }
      return;
    }
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
      console.log('Chart.js chart created successfully');
    } catch (error) {
      console.error('Error creating Chart.js chart:', error);
    }
  }

  private fetchOrdersAndProcessRevenue(): void {
    // Debug: log laundries and orders after both are loaded
    if (this.laundries?.length) {
      console.log('Laundries loaded:', this.laundries);
    }
    this.isLoadingOrders = true;
    this.http.get<any[]>(`${environment.apiUrl}/api/Order`).subscribe({
      next: (orders: any[]) => {
        // ...existing code for processing orders, stats, revenue...
        this.orders = orders;
        this.processMonthlyRevenue();
        // Set dataReady and try to render chart
        this.dataReady = true;
        this.tryRenderChart();
        // ...existing code for stats...
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
        this.stats.totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalCost || 0), 0);
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
        this.isLoadingOrders = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch orders:', err);
        this.isLoadingOrders = false;
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
    // Debug: log laundryRevenueData after processing
    console.log('laundryRevenueData after processing:', this.laundryRevenueData);
  }

  onAddAdmin(): void {
    this.showAddAdminForm = true;
  }

  submitAddAdmin(form: any): void {
    const token = localStorage.getItem('token');
    const now = new Date().toISOString();
    const formData = new FormData();
    formData.append('username', form.value.username);
    formData.append('password', form.value.password);
    formData.append('firstName', form.value.firstName || '');
    formData.append('lastName', form.value.lastName || '');
    formData.append('email', form.value.email);
    formData.append('role', form.value.role);
    formData.append('createdAt', now);
    formData.append('lastLogin', now);
    formData.append('passwordResetToken', '');
    formData.append('passwordResetExpiry', now);
    if (this.profileImageFile) {
      formData.append('profileImage', this.profileImageFile);
    }
    this.addAdminError = null;
    this.http.post(
      `${environment.apiUrl}/api/Admin`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: (res) => {
        this.showAddAdminForm = false;
        this.addAdminError = null;
        // Optionally show a success message or refresh admin list
      },
      error: (err) => {
        let msg = 'Failed to add admin.';
        if (err?.error && typeof err.error === 'string') {
          if (err.error.toLowerCase().includes('duplicate') || err.error.toLowerCase().includes('username')) {
            msg = 'Username already exists. Please choose a different username.';
          } else {
            msg = err.error;
          }
        }
        this.addAdminError = msg;
        console.error('Failed to add admin:', err);
      }
    });
  }

  confirmAddAdmin(form: NgForm) {
    // Show a confirmation dialog when Add Admin is pressed
    if (form.value.password !== form.value.retypePassword) {
      alert('Passwords do not match.');
      return;
    }
    if (confirm('Are you sure you want to add this admin?')) {
      this.submitAddAdmin(form);
    }
  }
}