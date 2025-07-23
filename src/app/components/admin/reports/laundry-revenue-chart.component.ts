import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, LineController, Title, Tooltip, Legend, ChartConfiguration, ChartDataset } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Title, Tooltip, Legend);

@Component({
  selector: 'app-laundry-revenue-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl p-8 mb-8 shadow-sm flex flex-col items-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Vave's Generated Revenue</h2>
      <div class="flex justify-center" style="width: 970px; height: 430px;">
        <canvas #revenueChart width="970" height="430" class="w-full h-full"></canvas>
      </div>
    </div>
  `,
  styleUrls: []
})
export class LaundryRevenueChartComponent implements AfterViewInit, OnChanges {
  @Input() months: string[] = [];
  @Input() laundryRevenueData: { [laundryId: string]: number[] } = {};
  @Input() laundryNames: { [laundryId: string]: string } = {};
  @Input() selectedLaundryId: string | null = null; // null means all laundries
  @ViewChild('revenueChart') private revenueChart!: ElementRef<HTMLCanvasElement>;
  private chartInstance: Chart | null = null;


  ngAfterViewInit(): void {
    console.debug('[LaundryRevenueChartComponent] ngAfterViewInit called');
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.debug('[LaundryRevenueChartComponent] ngOnChanges', changes);
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
    this.renderChart();
  }

  getChartImage(): string | null {
    const canvas = this.revenueChart?.nativeElement;
    if (!canvas) return null;
    return canvas.toDataURL('image/png');
  }

  private renderChart(): void {
    console.debug('[LaundryRevenueChartComponent] renderChart called');
    if (!this.revenueChart) {
      console.debug('No revenueChart ViewChild yet');
      return;
    }
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.debug('No 2d context for canvas');
      return;
    }
    let datasets: ChartDataset<'line'>[] = [];
    const colorPalette = [
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    if (this.selectedLaundryId && this.laundryRevenueData[this.selectedLaundryId]) {
      // Only selected laundry
      datasets = [{
        label: this.laundryNames[this.selectedLaundryId] || 'Laundry',
        data: this.laundryRevenueData[this.selectedLaundryId],
        borderColor: colorPalette[0],
        backgroundColor: colorPalette[0] + '33',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6
      } as ChartDataset<'line'>];
    } else {
      // All laundries
      datasets = Object.keys(this.laundryRevenueData).map((laundryId, idx) => {
        const color = colorPalette[idx % colorPalette.length];
        const bgColor = color + '33';
        return {
          label: this.laundryNames[laundryId] || `Laundry ${laundryId}`,
          data: this.laundryRevenueData[laundryId],
          borderColor: color,
          backgroundColor: bgColor,
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 6
        } as ChartDataset<'line'>;
      });
    }
    console.debug('Chart datasets:', datasets);
    // If no datasets, add a default empty dataset to show axes/grid
    if (datasets.length === 0) {
      datasets = [{
        label: 'No Data',
        data: (this.months && this.months.length > 0) ? new Array(this.months.length).fill(0) : [0],
        borderColor: 'rgba(200,200,200,0.5)',
        backgroundColor: 'rgba(200,200,200,0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0
      } as ChartDataset<'line'>];
      console.debug('No data, using default dataset:', datasets);
    }
    const chartConfig: ChartConfiguration<'line'> = {
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
    this.chartInstance = new Chart(ctx, chartConfig);
    console.debug('Chart rendered with config:', chartConfig);
  }
}
