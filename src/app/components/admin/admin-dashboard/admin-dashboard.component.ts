// Angular core imports for component, lifecycle hooks, and DOM access
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Import interfaces for type safety
import { AdminStats, AdminPanelMember, Laundry, Driver, PendingAction } from '../../../models/admin.interface';
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
  
  // Admin's display name
  adminName: string = '';
   constructor(private router: Router) {
    // Read the customer name from localStorage (set during login)
    const storedName = localStorage.getItem('adminUsername');
    this.adminName = storedName ? storedName : 'Customer';
  }
  
  // Dashboard statistics 
  stats: AdminStats = {
    totalPickups: 75,
    totalDeliveries: 357,
    totalHours: 65,
    totalRevenue: 128
  };

  // Admin panel members data
  adminPanel: AdminPanelMember[] = [
    { id: 1, name: 'Lahiru Gayantha', role: 'Chief Executive Officer', image: 'assets/images/admin1.jpg' },
    { id: 2, name: 'Chamal Silva', role: 'Chief Technical Officer', image: 'assets/images/admin2.jpg' },
    { id: 3, name: 'Upeksha Udayaratne', role: 'Chief Financial Officer', image: 'assets/images/admin3.jpg' },
    { id: 4, name: 'Chamini Lakeesha', role: 'Human Resources', image: 'assets/images/admin4.jpg' },
    { id: 5, name: 'Vidura Wijesekara', role: 'Chief Marketing Officer', image: 'assets/images/admin5.jpg' }
  ];

  // Laundry locations data
  laundries: Laundry[] = [
    { id: 1, name: 'Laundry 1', location: 'Nugegoda', rating: 4.8, logo: 'assets/images/laundry.png' },
    { id: 2, name: 'Laundry 2', location: 'Maharagama', rating: 4.7, logo: 'assets/images/laundry.png' },
    { id: 3, name: 'Laundry 3', location: 'Bambalapitiya', rating: 4.9, logo: 'assets/images/laundry.png' },
    { id: 4, name: 'Laundry 4', location: 'Piliyandala', rating: 4.6, logo: 'assets/images/laundry.png' },
    { id: 5, name: 'Laundry 5', location: 'Nugegoda', rating: 4.8, logo: 'assets/images/laundry.png' },
    { id: 6, name: 'Laundry 6', location: 'Dehiwala', rating: 4.7, logo: 'assets/images/laundry.png' },
    { id: 7, name: 'Laundry 7', location: 'Mount Lavinia', rating: 4.9, logo: 'assets/images/laundry.png' },
    { id: 8, name: 'Laundry 8', location: 'Ratmalana', rating: 4.8, logo: 'assets/images/laundry.png' },
    { id: 9, name: 'Laundry 9', location: 'Moratuwa', rating: 4.7, logo: 'assets/images/laundry.png' },
    { id: 10, name: 'Laundry 10', location: 'Panadura', rating: 4.9, logo: 'assets/images/laundry.png' }
  ];

  // Drivers data
  drivers: Driver[] = [
    { id: 1, name: 'Driver 1', location: 'Nugegoda', rating: 4.8, photo: 'assets/images/driver.png' },
    { id: 2, name: 'Driver 2', location: 'Maharagama', rating: 4.7, photo: 'assets/images/driver.png' },
    { id: 3, name: 'Driver 3', location: 'Bambalapitiya', rating: 4.9, photo: 'assets/images/driver.png' },
    { id: 4, name: 'Driver 4', location: 'Piliyandala', rating: 4.6, photo: 'assets/images/driver.png' },
    { id: 5, name: 'Driver 5', location: 'Nugegoda', rating: 4.8, photo: 'assets/images/driver.png' },
    { id: 6, name: 'Driver 6', location: 'Dehiwala', rating: 4.7, photo: 'assets/images/driver.png' },
    { id: 7, name: 'Driver 7', location: 'Mount Lavinia', rating: 4.9, photo: 'assets/images/driver.png' },
    { id: 8, name: 'Driver 8', location: 'Ratmalana', rating: 4.8, photo: 'assets/images/driver.png' },
    { id: 9, name: 'Driver 9', location: 'Moratuwa', rating: 4.7, photo: 'assets/images/driver.png' },
    { id: 10, name: 'Driver 10', location: 'Panadura', rating: 4.9, photo: 'assets/images/driver.png' }
  ];

  // Pending actions data
  pendingActions: PendingAction[] = [
    { type: 'pickup', count: 5 },
    { type: 'delivery', count: 8 }
  ];

  // Revenue data for chart
  revenueData = {
    laundryA: [10000, 15000, 18000, 25000, 32000, 38753, 28000, 22000, 18000, 20000, 23000, 22000],
    laundryB: [22000, 28000, 15000, 35000, 25000, 20000, 30000, 35000, 20000, 12667, 35000, 38000]
  };

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];



  // Angular lifecycle hook: runs after component initialization
  ngOnInit(): void {
    console.log('AdminDashboardComponent: ngOnInit');
    this.initializeData();
  }

  // Angular lifecycle hook  ngAfterViewInit() {
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

  // Helper method to initialize or log data
  private initializeData(): void {
    console.log('AdminDashboardComponent: Initializing data');
    console.log('Stats:', this.stats);
    console.log('Admin name:', this.adminName);
  }
}