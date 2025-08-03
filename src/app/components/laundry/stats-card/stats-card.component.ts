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
}




