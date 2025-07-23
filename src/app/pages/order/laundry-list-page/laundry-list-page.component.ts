import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { LaundryListComponent } from '../../../components/order/laundry-list/laundry-list.component';
import { Laundry } from '../../../models/laundry.model';
import { LaundryService } from '../../../services/laundry.service';

@Component({
  selector: 'app-laundry-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    LaundryListComponent, 
    SearchBarComponent
  ],
  templateUrl: './laundry-list-page.component.html',
  styleUrls: ['./laundry-list-page.component.css']
})
export class LaundryPageComponent implements OnInit {
  laundries: Laundry[] = []; 
  filteredLaundries: Laundry[] = []; 

  searchQuery: string = ''; 

  // Selected filters
  selectedLocation: string = ''; 
  selectedRating: string = ''; 

  // Holds unique data for the dropdown
  uniqueLocations: string[] = []; 
  uniqueRatings: number[] = []; 

  loading = true;
  error = '';

  // Injecting LaundryService to fetch laundry data
  constructor(private laundryService: LaundryService) {}

  ngOnInit() {
    this.loadLaundries();
  }

  // Method to fetch laundries from the API
  loadLaundries(): void {
    this.loading = true;
    this.error = '';
    
    // Call the service method to get data from API
    this.laundryService.getLaundries().subscribe({
      next: (data) => {
        this.laundries = data.map((laundry) => ({
          ...laundry,
          isFavorite: false 
        }));
        this.filteredLaundries = [...this.laundries]; 
        this.loading = false;

        // Extract unique locations and ratings
        this.uniqueLocations = [...new Set(this.laundries.map((laundry) => laundry.location))];
        this.extractUniqueRatings();
      },
      // Handle API error
      error: (err) => {
        this.error = err.message || 'Failed to load laundries';
        this.loading = false;
      }
    });
  }

  // Helper method to extract unique rating
  extractUniqueRatings(): void {
    this.uniqueRatings = [...new Set(this.laundries.map(laundry => laundry.rating))].sort();
  }

  // Method to handle favorite toggle from the laundry card
  toggleFavorite(laundry: Laundry) {
    laundry.isFavorite = !laundry.isFavorite; 
    this.sortLaundries(); 
  }

  // Sort the laundries to pin favorites to the top
  sortLaundries() {
    this.filteredLaundries.sort((a, b) => {
      if (a.isFavorite === b.isFavorite) return 0; 
      return a.isFavorite ? -1 : 1; 
    });
  }

  // Method to apply all filters
  filterLaundries() {
    this.filteredLaundries = this.laundries.filter((laundry) => {
      const matchesSearchQuery = laundry.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesLocation = this.selectedLocation ? laundry.location === this.selectedLocation : true;
      const matchesRating = this.selectedRating ? laundry.rating === +this.selectedRating : true;

      return matchesSearchQuery && matchesLocation && matchesRating;
    });

    this.sortLaundries(); 
  }

  // Method to handle laundry selection
  onSelectLaundry(laundryId: string) {
    console.log('Laundry selected:', laundryId);
  }

  // Handler for search component events
  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.filterLaundries();
  }
}
