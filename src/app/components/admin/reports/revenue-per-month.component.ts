import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartConfiguration, BarController } from 'chart.js';
import { environment } from '../../../../environments/environment';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

@Component({
  selector: 'app-revenue-per-month',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="bg-white rounded-xl p-8 mb-8 shadow-sm flex flex-col items-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Revenue Per Month</h2>
      <div *ngIf="loading" class="flex items-center justify-center h-96 w-full">
        <span class="text-gray-500 text-lg">Loading chart...</span>
      </div>
      <div *ngIf="error" class="flex items-center justify-center h-96 w-full">
        <span class="text-red-500 text-lg">Failed to load data. Please try again later.</span>
      </div>
      <div *ngIf="!loading && !error && noData" class="flex items-center justify-center h-96 w-full">
        <span class="text-gray-500 text-lg">No revenue data available for this period.</span>
      </div>
      <div class="flex justify-center" style="width: 970px; height: 430px;" *ngIf="!loading && !error && !noData">
        <canvas #revenueBarChart width="970" height="430" class="w-full h-full"></canvas>
      </div>
    </div>
  `,
  styleUrls: []
})
export class RevenuePerMonthComponent implements OnInit {
  loading = true;
  error = false;
  noData = false;
  apiUrlDebug = environment.apiUrl;
  /** Returns the chart as a PNG data URL */
  getChartImage(): string | null {
    const canvas = this.revenueBarChart?.nativeElement;
    if (!canvas) return null;
    return canvas.toDataURL('image/png');
  }
  @ViewChild('revenueBarChart') private revenueBarChart!: ElementRef<HTMLCanvasElement>;
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  private chartInstance: Chart | null = null;

  constructor(private http: HttpClient) {}

  private monthlyTotals: number[] = [];
  private dataLoaded = false;

  ngOnInit(): void {
    this.loading = true;
    this.error = false;
    this.noData = false;
    const apiUrl = `${environment.apiUrl}/api/Order`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (orders: any[]) => {
        this.monthlyTotals = Array(12).fill(0);
        let hasData = false;
        orders.forEach(order => {
          const total = order.totalCost;
          const dateStr = order.placedDate || order.placedDateTime;
          if (total == null || !dateStr) return;
          const date = new Date(dateStr);
          const month = date.getMonth();
          this.monthlyTotals[month] += Number(total);
          hasData = true;
        });
        this.loading = false;
        this.dataLoaded = true;
        if (!hasData) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = true;
        this.dataLoaded = false;
      }
    });
  }

  ngAfterViewInit(): void {
    // Try to render the chart after view init if data is already loaded
    this.tryRenderChart();
  }

  ngAfterViewChecked(): void {
    // Try to render the chart after every view check if data is loaded and chart not yet rendered
    this.tryRenderChart();
  }

  private tryRenderChart(): void {
    if (!this.loading && !this.error && !this.noData && this.dataLoaded && this.revenueBarChart?.nativeElement) {
      this.renderChart(this.monthlyTotals);
      // Only render once
      this.dataLoaded = false;
    }
  }

  private renderChart(monthlyTotals: number[]): void {
    const canvas = this.revenueBarChart?.nativeElement;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Total Revenue',
            data: monthlyTotals,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            borderRadius: 6,
            maxBarThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Revenue Per Month'
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return `Rs ${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (Rs)'
            },
            ticks: {
              callback: function(value: string | number) {
                return 'Rs ' + Number(value).toLocaleString();
              }
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
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.chartInstance = new Chart(ctx, chartConfig);
  }
}
