import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatsCardStat {
  title: string;
  value: string | number | { rating: number; max: number };
}

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
})
export class StatsCardComponent {
  @Input() stat: StatsCardStat | undefined;

  get Math() {
    return Math;
  }

  isRatingObj(val: any): val is { rating: number; max: number } {
    return val && typeof val === 'object' && 'rating' in val && 'max' in val;
  }

  getStarsArray(max: number): any[] {
    return Array.from({ length: max });
  }

  // Add a getter for the rating object
  get ratingObj() {
    return this.isRatingObj(this.stat?.value) ? (this.stat?.value as { rating: number; max: number }) : null;
  }

  // Calculate progress width for visual effect
  getProgressWidth(): number {
    if (this.stat?.title === 'Average Rating' && this.ratingObj) {
      return (this.ratingObj.rating / this.ratingObj.max) * 100;
    }
    
    if (this.stat?.title === 'Order Count') {
      const value = Number(this.stat.value);
      // Assume max orders for visualization is 100, adjust as needed
      return Math.min((value / 100) * 100, 100);
    }
    
    if (this.stat?.title === 'Revenue') {
      // For revenue, we'll use a logarithmic scale or percentage
      const valueStr = String(this.stat.value);
      const numericValue = parseFloat(valueStr.replace(/[^\d.]/g, ''));
      // Assume max revenue for visualization is 100000, adjust as needed
      return Math.min((numericValue / 100000) * 100, 100);
    }
    
    return 80; // Default progress
  }
}




