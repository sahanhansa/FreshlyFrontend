import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../order/star-rating/star-rating.component';
import {Router} from "@angular/router"; // Import Router for navigation
@Component({
  selector: 'app-laundry-card',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, StarRatingComponent],
  templateUrl: './laundry-card.component.html',
  styleUrls: ['./laundry-card.component.css']
})
export class LaundryCardComponent {
  @Input() public name: string = 'Unnamed Laundry'; // Provide defaults
  @Input() public location: string = 'Location not available';
  @Input() public rating: number = 0;
  @Input() public hasRatings: boolean = false; // New property
  @Input() public imageUrl!: string;
  @Input() public isFavorite: boolean = false;
  @Input() public id!: string; // New property for laundry ID
  @Output() public favoriteToggled = new EventEmitter<void>();
  @Output() public selectLaundry = new EventEmitter<string>(); // Emit event for selecting laundry


  constructor(private router: Router) {} // Inject Router for navigation
  toggleFavorite() {
    this.favoriteToggled.emit();
  }

  onSelectLaundry() {
    this.router.navigate([`/laundry/${this.id}`]);
    
  }
}
