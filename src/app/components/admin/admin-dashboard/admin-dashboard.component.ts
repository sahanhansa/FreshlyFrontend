import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminStats, AdminPanelMember, Laundry, Driver, PendingAction } from '../../../models/admin.interface';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartType,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from 'chart.js';

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueChart') revenueChart!: ElementRef<HTMLCanvasElement>;
  
  adminName: string = 'John Doe';
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

  pendingActions: PendingAction[] = [
    { type: 'pickup', count: 5 },
    { type: 'delivery', count: 8 }
  ];

  revenueData = {
    laundryA: [10000, 15000, 18000, 25000, 32000, 38753, 28000, 22000, 18000, 20000, 23000, 22000],
    laundryB: [22000, 28000, 15000, 35000, 25000, 20000, 30000, 35000, 20000, 12667, 35000, 38000]
  };

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  constructor() {
    console.log('AdminDashboardComponent: Constructor called');
  }

  ngOnInit() {
    console.log('AdminDashboardComponent: ngOnInit');
    this.initializeData();
  }

  ngAfterViewInit() {
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [{
            label: 'Monthly Revenue',
            data: this.revenueData.laundryA,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          layout: {
            padding: {
              top: 10,
              right: 20,
              bottom: 10,
              left: 20
            }
          }
        }
      });
    }
  }
  
  private initializeData() {
    console.log('AdminDashboardComponent: Initializing data');
    console.log('Stats:', this.stats);
    console.log('Admin name:', this.adminName);
  }
}