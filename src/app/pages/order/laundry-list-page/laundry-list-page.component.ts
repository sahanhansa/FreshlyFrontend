import { Component, OnInit } from '@angular/core';
// Remove Router import
import { Laundry } from '../../../models/laundry.model';
import { LaundryService } from '../../../services/laundry.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { LaundryListComponent } from '../../../components/order/laundry-list/laundry-list.component';

@Component({
  selector: 'app-laundry-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchBarComponent,
    LaundryListComponent
  ],
  templateUrl: './laundry-list-page.component.html',
  styleUrls: ['./laundry-list-page.component.css']
})
export class LaundryPageComponent implements OnInit {
  laundries: Laundry[] = []; // Full list of laundries
  filteredLaundries: Laundry[] = []; // Filtered list of laundries
  searchQuery: string = ''; // Search input value
  selectedLocation: string = ''; // Selected location filter
  selectedRating: string = ''; // Selected rating filter
  uniqueLocations: string[] = []; // Unique locations for the dropdown
  uniqueRatings: number[] = []; // Unique ratings for the dropdown
  loading = true;
  error = '';

  // Remove Router from constructor
  constructor(private laundryService: LaundryService) {}

  ngOnInit() {
    this.loadLaundries();
  }

  loadLaundries(): void {
    this.loading = true;
    this.error = '';
    
    this.laundryService.getLaundries().subscribe({
      next: (data) => {
        this.laundries = data.map((laundry) => ({
          ...laundry,
          isFavorite: false // Initialize `isFavorite` to false
        }));
        this.filteredLaundries = [...this.laundries]; // Initialize with the full list
        this.loading = false;

        // Extract unique locations and ratings
        this.uniqueLocations = [...new Set(this.laundries.map((laundry) => laundry.location))];
        this.extractUniqueRatings();
      },
      error: (err) => {
        this.error = err.message || 'Failed to load laundries';
        this.loading = false;
      }
    });
  }

  extractUniqueRatings(): void {
    // Extract unique ratings from the loaded data
    this.uniqueRatings = [...new Set(this.laundries.map(laundry => laundry.rating))].sort();
  }

  toggleFavorite(laundry: Laundry) {
    laundry.isFavorite = !laundry.isFavorite; // Toggle the favorite status
    this.sortLaundries(); // Sort the laundries to pin favorites to the top
  }

  sortLaundries() {
    this.filteredLaundries.sort((a, b) => {
      if (a.isFavorite === b.isFavorite) return 0; // Keep the order if both are favorites or non-favorites
      return a.isFavorite ? -1 : 1; // Favorites come first
    });
  }

  filterLaundries() {
    this.filteredLaundries = this.laundries.filter((laundry) => {
      const matchesSearchQuery = laundry.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesLocation = this.selectedLocation ? laundry.location === this.selectedLocation : true;
      const matchesRating = this.selectedRating ? laundry.rating === +this.selectedRating : true;

      return matchesSearchQuery && matchesLocation && matchesRating;
    });

    this.sortLaundries(); // Ensure favorites are always pinned to the top
  }

  // Replace the navigation function with an empty method
  onSelectLaundry(laundryId: string) {
    
    console.log('Laundry selected:', laundryId);
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.filterLaundries();
  }
}
