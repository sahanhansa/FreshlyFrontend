import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ViewChild } from '@angular/core';
import { RevenuePerMonthComponent } from './revenue-per-month.component';

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
  @ViewChild(RevenuePerMonthComponent) revenuePerMonthComp!: RevenuePerMonthComponent;
  activeCustomers: number = 0;
  totalCustomers: number = 0;
  years: number[] = [];
  months = [
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 1 },
    { name: 'Mar', value: 2 },
    { name: 'Apr', value: 3 },
    { name: 'May', value: 4 },
    { name: 'Jun', value: 5 },
    { name: 'Jul', value: 6 },
    { name: 'Aug', value: 7 },
    { name: 'Sep', value: 8 },
    { name: 'Oct', value: 9 },
    { name: 'Nov', value: 10 },
    { name: 'Dec', value: 11 }
  ];
  fromYear!: number;
  fromMonth!: number;
  toYear!: number;
  toMonth!: number;
  
  // Statistics
  // activeUsers removed (was hardcoded)
  
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

  // Driver Leaderboard (to be populated dynamically)
  driverLeaderboard: DriverLeaderboard[] = [];


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    this.fromYear = currentYear;
    this.toYear = currentYear;
    this.fromMonth = 0;
    this.toMonth = 11;
    this.fetchRevenueData();
    this.fetchActiveCustomers();
  }

  fetchActiveCustomers(): void {
    this.http.get<any[]>(`${environment.apiUrl}/api/Customer`).subscribe({
      next: (customers: any[]) => {
        this.totalCustomers = customers.length;
        this.activeCustomers = customers.filter(c => (c.AccountStatus || '').toLowerCase() === 'active').length;
      },
      error: (err: any) => {
        console.error('Failed to fetch customers:', err);
      }
    });
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
    // Fetch backend data and generate a well-organized admin report PDF with tables
    this.http.get<any[]>(`${environment.apiUrl}/api/Order`).subscribe({
      next: (orders: any[]) => {
        // --- Data Analysis ---
        const from = new Date(this.fromYear, this.fromMonth, 1);
        const to = new Date(this.toYear, this.toMonth + 1, 0, 23, 59, 59, 999);
        const filteredOrders = orders.filter(order => {
          const dateStr = order.placedDate || order.placedDateTime;
          if (!dateStr) return false;
          const date = new Date(dateStr);
          return date >= from && date <= to;
        });
        const totalOrders = filteredOrders.length;
        const totalRevenue = filteredOrders.reduce((sum, o) => sum + Number(o.totalCost || 0), 0);
        const averageOrderValue = totalOrders ? (totalRevenue / totalOrders) : 0;
        // Order status breakdown
        const statusCounts: any = { delivered: 0, inTransit: 0, pending: 0, cancelled: 0 };
        filteredOrders.forEach(order => {
          const status = (order.status?.statusDisplayName || order.status?.statusName || '').toLowerCase();
          if (status === 'delivered') statusCounts.delivered++;
          else if (status === 'in transit') statusCounts.inTransit++;
          else if (status === 'pending') statusCounts.pending++;
          else if (status === 'cancelled') statusCounts.cancelled++;
        });
        // Monthly revenue
        const monthlyTotals = Array(12).fill(0);
        filteredOrders.forEach(order => {
          const total = order.totalCost;
          const dateStr = order.placedDate || order.placedDateTime;
          if (total == null || !dateStr) return;
          const date = new Date(dateStr);
          const month = date.getMonth();
          monthlyTotals[month] += Number(total);
        });
        // Get chart image from child component
        let chartImg = '';
        if (this.revenuePerMonthComp && this.revenuePerMonthComp.getChartImage) {
          chartImg = this.revenuePerMonthComp.getChartImage() || '';
        }
        // --- PDF Generation ---
        const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
        let y = 40;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Admin Dashboard Report – ' + this.months[this.toMonth].name + ' ' + this.toYear, 40, y);
        doc.setFont('helvetica', 'normal');
        y += 30;
        doc.setFontSize(12);
        doc.text('Platform: Freshly', 40, y);
        doc.text('Generated by: Admin Panel', 200, y);
        doc.text('Date Generated: ' + new Date().toLocaleString(), 400, y);
        y += 30;
        doc.setFontSize(14);
        doc.text('Summary Overview (' + this.months[this.fromMonth].name + ' ' + this.fromYear + ' – ' + this.months[this.toMonth].name + ' ' + this.toYear + ')', 40, y);
        y += 20;
        doc.setFontSize(12);
        autoTable(doc, {
          startY: y,
          head: [['Metric', 'Value']],
          body: [
            ['Total Orders', totalOrders],
            ['Total Revenue (Rs)', totalRevenue.toFixed(2)],
            ['Average Order Value (Rs)', averageOrderValue.toFixed(2)]
          ],
          theme: 'grid',
          styles: { font: 'helvetica', fontSize: 12 },
        });
        y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : y + 10;
        autoTable(doc, {
          startY: y,
          head: [['Order Status', 'Count']],
          body: [
            ['Delivered', statusCounts.delivered],
            ['In Transit', statusCounts.inTransit],
            ['Pending', statusCounts.pending],
            ['Cancelled', statusCounts.cancelled]
          ],
          theme: 'grid',
          styles: { font: 'helvetica', fontSize: 12 },
        });
        y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : y + 10;
        doc.setFontSize(14);
        doc.text('Monthly Revenue Chart', 40, y);
        y += 20;
        if (chartImg) {
          doc.addImage(chartImg, 'PNG', 40, y, 600, 200);
          y += 210;
        }
        autoTable(doc, {
          startY: y,
          head: [['Month', 'Revenue (Rs)']],
          body: this.months.map((m, idx) => [m.name, monthlyTotals[idx].toFixed(2)]),
          theme: 'grid',
          styles: { font: 'helvetica', fontSize: 12 },
        });
        doc.save('admin-dashboard-report.pdf');
      },
      error: (err: any) => {
        console.error('Failed to fetch orders for report:', err);
      }
    });
  }
}