import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private static registered = false;

  private colorPalette = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ];

  constructor() {
    if (!ChartService.registered) {
      Chart.register(...registerables);
      ChartService.registered = true;
    }
  }

  createLineChart(
    canvas: HTMLCanvasElement,
    data: ChartConfiguration['data'],
    options?: ChartConfiguration['options']
  ): Chart {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not available');

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: this.applyColors(data, false),
      options: this.mergeOptions(
        {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true }
          },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }
          }
        },
        options
      )
    };

    return new Chart(ctx, config);
  }

  createBarChart(
    canvas: HTMLCanvasElement,
    data: ChartConfiguration['data'],
    options?: ChartConfiguration['options']
  ): Chart {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not available');

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: this.applyColors(data, true),
      options: this.mergeOptions(
        {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true }
          },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }
          }
        },
        options
      )
    };

    return new Chart(ctx, config);
  }

  private applyColors(
    data: ChartConfiguration['data'],
    fill = false
  ): ChartConfiguration['data'] {
    const datasets = (data.datasets ?? []).map((ds, idx) => {
      const color = this.colorPalette[idx % this.colorPalette.length];
      const bg = fill ? this.hexToRgba(color, 0.2) : color;
      return {
        ...ds,
        borderColor: (ds as any).borderColor ?? color,
        backgroundColor: (ds as any).backgroundColor ?? bg,
        fill: (ds as any).fill ?? fill,
        tension: (ds as any).tension ?? 0.3
      };
    });
    return { ...data, datasets };
  }

  private hexToRgba(hex: string, alpha: number): string {
    const cleaned = hex.replace('#', '');
    const bigint = parseInt(cleaned, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private mergeOptions(
    base: ChartConfiguration['options'],
    override?: ChartConfiguration['options']
  ): ChartConfiguration['options'] {
    if (!override) return base;
    return {
      ...base,
      ...override,
      plugins: { ...(base?.plugins || {}), ...(override.plugins || {}) },
      scales: { ...(base as any)?.scales, ...(override as any)?.scales }
    };
  }
}