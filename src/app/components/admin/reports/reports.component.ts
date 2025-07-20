import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevenuePerMonthComponent } from './revenue-per-month.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface DriverLeaderboard {
  name: string;
  points: number;
  correctPercentage: string;
  rank: number;
  trend: 'up' | 'down';
  image?: string;
}

interface LaundryLeaderboard {
  name: string;
  points: number;
  userCount: number;
  correctPercentage: string;
  rank: number;
  trend: 'up' | 'down';
}

interface RevenueData {
  month: string;
  amount: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
imports: [CommonModule, FormsModule, RevenuePerMonthComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  fromDate: string = '12/24/2024';
  toDate: string = '12/24/2024';
  
  // Statistics
  activeUsers = {
    current: 27,
    total: 80
  };
  
  complaintsAnswered = 3298;
  avgSessionLength = '2m 34s';
  
  knowledge = {
    starting: 64,
    current: 86,
    gain: 34
  };

  // Revenue data for the chart
  revenueData: RevenueData[] = [
    { month: 'Jan', amount: 0 },
    { month: 'Feb', amount: 0 },
    { month: 'Mar', amount: 0 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 },
    { month: 'Jul', amount: 0 },
    { month: 'Aug', amount: 0 },
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 }
  ];

  // Driver Leaderboard
  driverLeaderboard: DriverLeaderboard[] = [
    { name: 'Jesse Thomas', points: 637, correctPercentage: '98%', rank: 1, trend: 'up' },
    { name: 'Thisal Mathiyazhagan', points: 637, correctPercentage: '89%', rank: 2, trend: 'down' },
    { name: 'Helen Chuang', points: 637, correctPercentage: '86%', rank: 3, trend: 'up' },
    { name: 'Lura Silverman', points: 637, correctPercentage: '', rank: 4, trend: 'up' },
    { name: 'Winifred Groton', points: 637, correctPercentage: '', rank: 5, trend: 'down' },
    { name: 'Ken Alba', points: 637, correctPercentage: '', rank: 6, trend: 'up' },
    { name: 'Alice LeBeau', points: 637, correctPercentage: '', rank: 7, trend: 'down' },
    { name: 'Adrian Lu', points: 637, correctPercentage: '', rank: 8, trend: 'up' },
    { name: 'Evelyn Hamilton', points: 637, correctPercentage: '', rank: 9, trend: 'down' },
    { name: 'Rosa Fiddlebrook', points: 637, correctPercentage: '', rank: 10, trend: 'up' }
  ];

  // Laundries Leaderboard
  laundriesLeaderboard: LaundryLeaderboard[] = [
    { name: 'Houston Facility', points: 52, userCount: 52, correctPercentage: '97%', rank: 1, trend: 'up' },
    { name: 'Test Group', points: 52, userCount: 52, correctPercentage: '95%', rank: 2, trend: 'down' },
    { name: 'Sales Leadership', points: 52, userCount: 52, correctPercentage: '87%', rank: 3, trend: 'up' },
    { name: 'Northeast Region', points: 52, userCount: 52, correctPercentage: '', rank: 4, trend: 'up' },
    { name: 'Southeast Region', points: 52, userCount: 52, correctPercentage: '', rank: 5, trend: 'down' },
    { name: 'District Managers', points: 52, userCount: 52, correctPercentage: '', rank: 6, trend: 'up' },
    { name: 'Senior Managers', points: 52, userCount: 52, correctPercentage: '', rank: 7, trend: 'down' },
    { name: 'New Hires', points: 52, userCount: 52, correctPercentage: '', rank: 8, trend: 'up' },
    { name: 'Southwest Region', points: 52, userCount: 52, correctPercentage: '', rank: 9, trend: 'down' },
    { name: 'Northwest Region', points: 52, userCount: 52, correctPercentage: '', rank: 10, trend: 'up' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRevenueData();
  }

  fetchRevenueData(): void {
    this.http.get<any[]>(`${environment.apiUrl}/api/Order`).subscribe({
      next: (orders: any[]) => {
        // Reset monthly totals
        const monthlyTotals = Array(12).fill(0);
        orders.forEach(order => {
          const total = order.totalCost;
          const dateStr = order.placedDate || order.placedDateTime;
          if (total == null || !dateStr) return;
          const date = new Date(dateStr);
          const month = date.getMonth();
          monthlyTotals[month] += Number(total);
        });
        this.revenueData = this.revenueData.map((row, idx) => ({ month: row.month, amount: monthlyTotals[idx] }));
      },
      error: (err: any) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  }

  onDateChange(): void {
    // Implement date change logic
  }

  downloadReport(): void {
    // Fetch backend data and generate CSV after API call
    this.http.get<any[]>(`${environment.apiUrl}/api/Order`).subscribe({
      next: (orders: any[]) => {
        const monthlyTotals = Array(12).fill(0);
        orders.forEach(order => {
          const total = order.totalCost;
          const dateStr = order.placedDate || order.placedDateTime;
          if (total == null || !dateStr) return;
          const date = new Date(dateStr);
          const month = date.getMonth();
          monthlyTotals[month] += Number(total);
        });
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const header = 'Month,Revenue (Rs)\n';
        const rows = months.map((m, idx) => `${m},${monthlyTotals[idx]}`).join('\n');
        const csvContent = header + rows;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'monthly-revenue-report.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error('Failed to fetch orders for report:', err);
      }
    });
  }
}