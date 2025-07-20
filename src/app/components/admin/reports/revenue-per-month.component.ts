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
      <div class="flex justify-center" style="width: 970px; height: 430px;">
        <canvas #revenueBarChart class="w-full h-full"></canvas>
      </div>
    </div>
  `,
  styleUrls: []
})
export class RevenuePerMonthComponent implements OnInit {
  @ViewChild('revenueBarChart') private revenueBarChart!: ElementRef<HTMLCanvasElement>;
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  private chartInstance: Chart | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // No chart rendering here
  }

  ngAfterViewInit(): void {
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
        this.renderChart(monthlyTotals);
      },
      error: (err: any) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  }

  private renderChart(monthlyTotals: number[]): void {
    const canvas = this.revenueBarChart?.nativeElement;
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context from canvas element');
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
