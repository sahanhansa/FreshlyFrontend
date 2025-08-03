import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { environment } from '../../../../environments/environment';
import { NavbarComponent } from "@app/components/shared/navbar/navbar.component";

interface MonthlyStatsResponse {
  laundryId: string;
  year: number;
  month: number;
  orderCount: number;
  revenue: number;
}

interface YearlyStatsResponse {
  laundryId: string;
  year: number;
  orderCount: number;
  revenue: number;
}

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ordersChart') ordersChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  ordersChart: Chart | null = null;
  revenueChart: Chart | null = null;

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  years: number[] = [];
  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  monthlyStatsArr: MonthlyStatsResponse[] = [];
  yearlyStatsArr: YearlyStatsResponse[] = [];
  monthlyStats: MonthlyStatsResponse | null = null;
  yearlyStats: YearlyStatsResponse | null = null;
  chartType: 'monthly' | 'yearly' = 'monthly';
  isDownloading: boolean = false;
  downloadError: string | null = null;

  get laundryId(): string {
    return localStorage.getItem('laundryId') || '';
  }

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
      this.years.push(currentYear - i);
    }
  }

  ngAfterViewInit() {
    this.fetchAllMonthlyStats();
    this.fetchAllYearlyStats();
    this.fetchMonthlyStats();
    this.fetchYearlyStats();
  }

  ngOnDestroy() {
    if (this.ordersChart) {
      this.ordersChart.destroy();
    }
    if (this.revenueChart) {
      this.revenueChart.destroy();
    }
  }

  fetchAllMonthlyStats() {
    // Fetch stats for all 12 months of the selected year
    this.monthlyStatsArr = [];
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    let completed = 0;
    for (let m = 1; m <= 12; m++) {
      const url = `${environment.apiUrl}/api/Profile/stats/monthly/${this.laundryId}?year=${this.selectedYear}&month=${m}`;
      this.http.get<MonthlyStatsResponse>(url, { headers }).subscribe(data => {
        this.monthlyStatsArr[m-1] = data;
        completed++;
        if (completed === 12 && this.chartType === 'monthly') {
          this.renderChart();
        }
      });
    }
  }

  fetchAllYearlyStats() {
    // Fetch stats for the last 6 years
    this.yearlyStatsArr = [];
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    let completed = 0;
    for (let i = 0; i < 6; i++) {
      const year = this.years[i];
      const url = `${environment.apiUrl}/api/Profile/stats/yearly/${this.laundryId}?year=${year}`;
      this.http.get<YearlyStatsResponse>(url, { headers }).subscribe(data => {
        this.yearlyStatsArr[i] = data;
        completed++;
        if (completed === 6 && this.chartType === 'yearly') {
          this.renderChart();
        }
      });
    }
  }

  fetchMonthlyStats() {
    if (!this.laundryId) return;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const url = `${environment.apiUrl}/api/Profile/stats/monthly/${this.laundryId}?year=${this.selectedYear}&month=${this.selectedMonth}`;
    this.http.get<MonthlyStatsResponse>(url, { headers }).subscribe(data => {
      this.monthlyStats = data;
      if (this.chartType === 'monthly') {
        this.renderChart();
      }
    });
  }

  fetchYearlyStats() {
    if (!this.laundryId) return;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const url = `${environment.apiUrl}/api/Profile/stats/yearly/${this.laundryId}?year=${this.selectedYear}`;
    this.http.get<YearlyStatsResponse>(url, { headers }).subscribe(data => {
      this.yearlyStats = data;
      if (this.chartType === 'yearly') {
        this.renderChart();
      }
    });
  }

  onMonthChange(month: number) {
    this.selectedMonth = month;
    this.fetchMonthlyStats();
    this.fetchAllMonthlyStats();
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.fetchMonthlyStats();
    this.fetchYearlyStats();
    this.fetchAllMonthlyStats();
    this.fetchAllYearlyStats();
  }

  setChartType(type: 'monthly' | 'yearly') {
    this.chartType = type;
    this.renderChart();
  }

  renderChart() {
    // Orders chart
    if (this.ordersChart) {
      this.ordersChart.destroy();
    }
    if (this.ordersChartRef) {
      const ctx = this.ordersChartRef.nativeElement.getContext('2d');
      if (ctx) {
        if (this.chartType === 'monthly' && this.monthlyStatsArr.length === 12) {
          this.ordersChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.months.map(m => `M${m}`),
              datasets: [
                {
                  label: 'Orders',
                  data: this.monthlyStatsArr.map(stat => stat?.orderCount ?? 0),
                  backgroundColor: '#2563eb'
                }
              ]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } }
            }
          });
        } else if (this.chartType === 'yearly' && this.yearlyStatsArr.length === 6) {
          this.ordersChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.years.map(y => y.toString()),
              datasets: [
                {
                  label: 'Orders',
                  data: this.yearlyStatsArr.map(stat => stat?.orderCount ?? 0),
                  backgroundColor: '#2563eb'
                }
              ]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } }
            }
          });
        }
      }
    }
    // Revenue chart
    if (this.revenueChart) {
      this.revenueChart.destroy();
    }
    if (this.revenueChartRef) {
      const ctx = this.revenueChartRef.nativeElement.getContext('2d');
      if (ctx) {
        if (this.chartType === 'monthly' && this.monthlyStatsArr.length === 12) {
          this.revenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.months.map(m => `M${m}`),
              datasets: [
                {
                  label: 'Revenue',
                  data: this.monthlyStatsArr.map(stat => stat?.revenue ?? 0),
                  backgroundColor: '#10b981'
                }
              ]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } }
            }
          });
        } else if (this.chartType === 'yearly' && this.yearlyStatsArr.length === 6) {
          this.revenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.years.map(y => y.toString()),
              datasets: [
                {
                  label: 'Revenue',
                  data: this.yearlyStatsArr.map(stat => stat?.revenue ?? 0),
                  backgroundColor: '#10b981'
                }
              ]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } }
            }
          });
        }
      }
    }
  }

  downloadInsightsReport() {
    if (!this.laundryId) return;
    this.isDownloading = true;
    this.downloadError = null;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const url = `${environment.apiUrl}/api/Profile/insights-report/${this.laundryId}?year=${this.selectedYear}`;
    this.http.get(url, { headers, responseType: 'blob' }).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `insights-report-${this.selectedYear}.pdf`;
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.isDownloading = false;
      },
      error: (err) => {
        this.downloadError = 'Failed to download report.';
        this.isDownloading = false;
      }
    });
  }
} 