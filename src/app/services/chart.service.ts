// src/app/shared/services/chart.service.ts
@Injectable({ providedIn: 'root' })
export class ChartService {
  private colorPalette = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ];

  createLineChart(canvas: HTMLCanvasElement, data: any, options?: any): Chart {
    // Centralized chart creation
  }
  
  createBarChart(canvas: HTMLCanvasElement, data: any, options?: any): Chart {
    // Centralized chart creation
  }
}