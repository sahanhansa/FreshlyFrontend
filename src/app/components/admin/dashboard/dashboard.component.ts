import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

// Register all Chart.js components globally
Chart.register(...registerables);

// Component selector, template, and styles
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  // Reference to the canvas element in the template for the chart
  @ViewChild('revenueChart') revenueChart!: ElementRef;
  chart: any;

  // Lifecycle hook that is called after the view has been initialized
  ngAfterViewInit() {
    this.initializeChart();
  }

   // Initializes the Chart.js chart
  private initializeChart() {
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    // Create a new Chart.js line chart
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Monthly Revenue',// Legend label
          data: [1200, 1900, 3000, 5000, 2000, 3000],
          borderColor: '#4CAF50',
          tension: 0.1,// Line curve tension
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true// Y-axis starts at zero
          }
        }
      }
    });
  }
}
