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
  // Input properties for the laundry
  @Input() public id!: string;
  @Input() public name: string = 'Unnamed Laundry'; 
  @Input() public location: string = 'Location not available';
  @Input() public rating: number = 0;
  @Input() public hasRatings: boolean = false; 
  @Input() public imageUrl!: string;
  @Input() public isFavorite: boolean = false;

  // Output event emitters
  @Output() public favoriteToggled = new EventEmitter<void>();
  @Output() public selectLaundry = new EventEmitter<string>(); 

  // Constructor to inject Router for navigation
  constructor(private router: Router) {} 

  // Method called when the favorite icon is clicked
  toggleFavorite() {
    this.favoriteToggled.emit();
  }

  // Method called when the "Select Laundry" button is clicked
  onSelectLaundry() {
    this.router.navigate([`/cus-home/laundry/${this.id}`]);
    
  }
}
