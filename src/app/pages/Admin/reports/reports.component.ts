import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ViewChild } from '@angular/core';
import { RevenuePerMonthComponent } from '../../../components/admin/reports/revenue-per-month.component';
import { LaundryLeaderboardComponent } from '../../../components/admin/reports/laundry-leaderboard.component';
import { LaundryService } from '../../../services/laundry.service';



interface RevenueData {
  month: string;
  amount: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
imports: [CommonModule, FormsModule, LaundryLeaderboardComponent, RevenuePerMonthComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  // @ViewChild(RevenuePerMonthComponent) revenuePerMonthComp!: RevenuePerMonthComponent;
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

  get monthsAsNames(): string[] {
    return this.months.map(m => m.name);
  }
  fromYear!: number;
  fromMonth!: number;
  toYear!: number;
  toMonth!: number;
  laundries: { laundryId: string, laundryName: string }[] = [];
  selectedLaundryId: string | null = null;
  laundryRevenueData: { [laundryId: string]: number[] } = {};
  laundryNames: { [laundryId: string]: string } = {};

  private laundryService = inject(LaundryService);
  constructor(private http: HttpClient) {}
  ngOnInit(): void {

    // Populate years from 2020 to 2030 (inclusive), ascending order
    this.years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    this.fromYear = this.years[0];
    this.toYear = this.years[this.years.length - 1];
    this.fromMonth = 0;
    this.toMonth = 11;

    // Fetch laundries for dropdown
    this.laundryService.getLaundries().subscribe({
      next: (laundries) => {
        this.laundries = laundries.map(l => ({ laundryId: String(l.id), laundryName: l.name }));
        this.laundryNames = {};
        for (const l of this.laundries) {
          this.laundryNames[l.laundryId] = l.laundryName;
        }
        // Optionally, fetch revenue data here or elsewhere
        this.fetchLaundryRevenueData();
      },
      error: (err) => {
        this.laundries = [];
        this.laundryNames = {};
      }
    });

    // Fetch orders for report and PDF
    this.http.get<any[]>(`${environment.apiUrl}/api/Order`).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        this.orders = [];
      }
    });
  }

  fetchLaundryRevenueData() {
    // TODO: Replace with actual API call to fetch revenue data for all laundries
    // For now, mock data for demonstration
    // Assume 12 months
    const months = this.months.map(m => m.name);
    this.laundryRevenueData = {};
    for (const l of this.laundries) {
      this.laundryRevenueData[l.laundryId] = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000));
    }
    // Optionally, add an 'all' key for all laundries combined
  }
  @ViewChild('laundryLeaderboardComp') laundryLeaderboardComp?: any;
  @ViewChild(RevenuePerMonthComponent) revenuePerMonthComp?: RevenuePerMonthComponent;

  orders: Array<any> = [];

  laundryLoading = false;
  laundryError = false;

  downloadReport() {
    // Wait a short time to ensure the chart is fully rendered before capturing the image
    setTimeout(() => {
      // Filter orders by selected period
      const fromDate = new Date(this.fromYear, this.fromMonth, 1);
      const toDate = new Date(this.toYear, this.toMonth + 1, 0, 23, 59, 59, 999); // end of month
      const data = (this.orders || []).filter(order => {
        const orderDate = new Date(order.placedDate);
        return orderDate >= fromDate && orderDate <= toDate;
      });
      const doc = new jsPDF('p', 'mm', 'a4');
      let y = 18;

      // Title and Date
      doc.setFontSize(18);
      doc.text('Laundry Business Report', 14, y);
      y += 8;
      doc.setFontSize(11);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, y);
      y += 8;
      doc.text(`Period: ${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`, 14, y);
      y += 8;

      // Summary Metrics
      const totalOrders = data.length;
      const totalRevenue = data.reduce((sum, order) => sum + order.totalCost, 0);
      const avgOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : '0.00';

      autoTable(doc, {
        startY: y,
        head: [['Metric', 'Value']],
        body: [
          ['Total Orders', totalOrders.toString()],
          ['Total Revenue', `LKR ${totalRevenue.toFixed(2)}`],
          ['Avg. Order Value', `LKR ${avgOrderValue}`],
        ],
        theme: 'striped',
        styles: { fontSize: 10 }
      });
      y = (doc as any).lastAutoTable.finalY + 8;

      // Income by Laundry
      const laundryMap = new Map();
      data.forEach(order => {
        const name = order.laundry.laundryName;
        const prev = laundryMap.get(name) || { count: 0, revenue: 0 };
        laundryMap.set(name, {
          count: prev.count + 1,
          revenue: prev.revenue + order.totalCost
        });
      });
      const incomeBody = Array.from(laundryMap.entries()).map(([laundry, val]) => [
        laundry,
        val.count.toString(),
        `LKR ${val.revenue.toFixed(2)}`
      ]);
      autoTable(doc, {
        startY: y,
        head: [['Laundry Name', 'Order Count', 'Total Revenue']],
        body: incomeBody,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 }
      });
      y = (doc as any).lastAutoTable.finalY + 8;

      // Insert charts
      if (this.revenuePerMonthComp && this.revenuePerMonthComp.getChartImage) {
        const chartImg = this.revenuePerMonthComp.getChartImage();
        if (chartImg) {
          doc.setFontSize(16);
          doc.text('Revenue Per Month', 14, y);
          y += 6;
          doc.addImage(chartImg, 'PNG', 14, y, 180, 80);
          y += 85;
        }
      }
      if (this.laundryLeaderboardComp && this.laundryLeaderboardComp.getChartImage) {
        const leaderboardChartImg = this.laundryLeaderboardComp.getChartImage();
        if (leaderboardChartImg) {
          doc.setFontSize(16);
          doc.text('Laundry Leaderboard', 14, y);
          y += 6;
          doc.addImage(leaderboardChartImg, 'PNG', 14, y, 180, 80);
          y += 85;
        }
      }

      // Order Details Table (move to end, allow to break across pages)
      const ordersBody = data.map(order => [
        order.orderId.slice(0, 8),
        `${order.customer.firstName} ${order.customer.lastName}`,
        order.laundry.laundryName,
        order.placedDate,
        order.status.statusDisplayName,
        `LKR ${order.totalCost.toFixed(2)}`
      ]);
      autoTable(doc, {
        startY: y,
        head: [['Order ID', 'Customer Name', 'Laundry', 'Date', 'Status', 'Amount (LKR)']],
        body: ordersBody,
        styles: { fontSize: 9 },
        theme: 'striped',
        headStyles: { fillColor: [60, 141, 188], textColor: 255 },
        pageBreak: 'auto', // allow table to break across pages
        didDrawPage: function (data) {
          // Footer with page numbers
          const pageCount = doc.getNumberOfPages();
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.setFontSize(9);
          // Use data.pageNumber for current page
          doc.text(`Page ${data.pageNumber} of ${pageCount}`, 105, pageHeight - 10, { align: 'center' });
        }
      });

      // Save the PDF
      const name = this.selectedLaundryId && this.laundryNames[this.selectedLaundryId]
        ? `Report_${this.laundryNames[this.selectedLaundryId]}`
        : 'Report_All_Laundries';
      doc.save(`${name}_${new Date().toISOString().slice(0, 10)}.pdf`);
    }, 300); // 300ms delay to allow chart to render
  }
  scrollToLeaderboard() {
    const el = document.getElementById('laundry-leaderboard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
