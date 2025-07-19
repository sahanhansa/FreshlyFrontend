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
  Title,
  Tooltip,
  Legend,
  ChartConfiguration
} from 'chart.js';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
//Component decorator with metadata
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueChart') private revenueChart!: ElementRef<HTMLCanvasElement>;

  adminName: string = '';
  laundries: Laundry[] = [];
  stats: AdminStats = {
    totalPickups: 75,
    totalDeliveries: 357,
    totalHours: 65,
    totalRevenue: 128
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
    laundryA: [10000, 15000, 18000, 25000, 32000, 38753, 28000, 22000, 18000, 20000, 23000, 22000],
    laundryB: [22000, 28000, 15000, 35000, 25000, 20000, 30000, 35000, 20000, 12667, 35000, 38000]
  };
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  constructor(private router: Router, private laundryService: LaundryService, private driverService: AdminDriverService) {
    const storedName = localStorage.getItem('adminUsername');
    this.adminName = storedName ? storedName : 'Customer';
  }

  ngOnInit(): void {
    console.log('AdminDashboardComponent: ngOnInit');
    this.initializeData();
    this.laundryService.getLaundries().subscribe({
      next: (laundries: any[]) => {
        this.laundries = laundries.map(laundry => ({
          id: laundry.id || laundry.laundryId || '',
          name: laundry.name || laundry.laundryName || 'Unnamed Laundry',
          location: laundry.location || laundry.city || 'Location not available',
          rating: laundry.rating || laundry.averageRating || 0,
          logo: 'assets/images/laundry.png'
        }));
      },
      error: (err: any) => {
        console.error('Failed to fetch laundries:', err);
      }
    });

    this.driverService.getDrivers().subscribe({
      next: (drivers: any[]) => {
        this.drivers = drivers.map(driver => ({
          id: driver.driverId || '',
          name: (driver.firstName ? driver.firstName : '') + (driver.lastName ? ' ' + driver.lastName : ''),
          location: driver.address?.city || 'Location not available',
          rating: driver.rating || 0,
          photo: driver.profileImageUrl || 'assets/images/driver.png'
        }));
      },
      error: (err: any) => {
        console.error('Failed to fetch drivers:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    const canvas = this.revenueChart.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context from canvas element');
      return;
    }
    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Laundry A',
            data: this.revenueData.laundryA,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            fill: true
          },
          {
            label: 'Laundry B',
            data: this.revenueData.laundryB,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.1,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Revenue'
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
    new Chart(ctx, chartConfig);
  }

  private initializeData(): void {
    console.log('AdminDashboardComponent: Initializing data');
    console.log('Stats:', this.stats);
    console.log('Admin name:', this.adminName);
  }
}