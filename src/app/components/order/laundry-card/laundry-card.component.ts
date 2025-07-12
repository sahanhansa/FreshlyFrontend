import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laundry-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laundry-card.component.html',
  styleUrls: ['./laundry-card.component.css']
})
export class LaundryCardComponent {
  @Input() public name!: string;
  @Input() public location!: string;
  @Input() public rating!: number;
  @Input() public imageUrl!: string;
  @Input() public isFavorite: boolean = false;
  @Output() public favoriteToggled = new EventEmitter<void>();
  @Output() public selectLaundry = new EventEmitter<void>(); // Emit event for selecting laundry

  toggleFavorite() {
    this.favoriteToggled.emit();
  }

  onSelectLaundry() {
    this.selectLaundry.emit(); // Emit the event to the parent component
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
