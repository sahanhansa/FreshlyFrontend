import { Component, OnInit } from '@angular/core';
import { Laundry } from '../../../models/laundry.model';
import { LaundryService } from '../../../services/laundry.service';
import { LaundryCardComponent } from '../laundry-card/laundry-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-laundry-list',
  standalone: true,
  imports: [CommonModule, LaundryCardComponent, FormsModule],
  templateUrl: './laundry-list.component.html',
  styleUrls: ['./laundry-list.component.css']
})
export class LaundryListComponent implements OnInit {
  laundries: Laundry[] = []; // Full list of laundries
  filteredLaundries: Laundry[] = []; // Filtered list of laundries
  searchQuery: string = ''; // Search input value
  selectedLocation: string = ''; // Selected location filter
  selectedRating: string = ''; // Selected rating filter
  uniqueLocations: string[] = []; // Unique locations for the dropdown
  uniqueRatings: number[] = []; // Unique ratings for the dropdown

  constructor(private laundryService: LaundryService) {}

  ngOnInit() {
    this.laundries = this.laundryService.getLaundries();
    this.filteredLaundries = [...this.laundries]; // Initialize with the full list

    // Extract unique locations and ratings
    this.uniqueLocations = [...new Set(this.laundries.map((laundry) => laundry.location))];
    this.uniqueRatings = [...new Set(this.laundries.map((laundry) => laundry.rating))].sort();
  }

  filterLaundries() {
    this.filteredLaundries = this.laundries.filter((laundry) => {
      const matchesSearchQuery = laundry.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesLocation = this.selectedLocation ? laundry.location === this.selectedLocation : true;
      const matchesRating = this.selectedRating ? laundry.rating === +this.selectedRating : true;

      return matchesSearchQuery && matchesLocation && matchesRating;
    });
  }
}
