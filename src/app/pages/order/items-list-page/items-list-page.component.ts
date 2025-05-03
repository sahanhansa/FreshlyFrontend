import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../models/item.model';
import { ItemService } from '../../../services/item.service';
import { LaundryService } from '../../../services/laundry.service';
import { ItemCardListComponent } from "../../../components/order/item-card-list/item-card-list.component";
import { CommonModule } from '@angular/common';
import { ItemCategoryComponent } from "../../../components/order/item-category/item-category.component";
import { FormsModule } from '@angular/forms';
import { Laundry } from '../../../models/laundry.model';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items-list-page',
  standalone: true,
  templateUrl: './items-list-page.component.html',
  styleUrls: ['./items-list-page.component.css'],
  imports: [ItemCardListComponent, CommonModule, ItemCategoryComponent, FormsModule]
})
export class ItemsListPageComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  selectedCategory = 'Ladies'; // Default category
  searchQuery = ''; // Search input value
  laundryId: number = 0; // Store the selected laundry ID
  laundry: Laundry | null = null;
  loading = true;
  error = '';

  // Category mapping: Map UI category names to item description values
  categoryMapping: { [key: string]: string[] } = {
    'Ladies': ['Ladies wear'],
    'Gents': ['Gents wear'],
    'Kids': ['Baby wear'], // Map "Kids" category to "Baby wear" description
    'Other': ['Household items'] // Map "Other" category to "Household items" description
  };

  constructor(private itemService: ItemService, private route: ActivatedRoute, private laundryService: LaundryService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laundryId = +params['id']; // Convert to number with '+'
      this.loadLaundryDetails();
    });
    this.items = this.itemService.getItems(); // Fetch all items
  }

  loadLaundryDetails(): void {
    this.loading = true;
    
    // Option 1: Use getLaundryById if it's implemented
    this.laundryService.getLaundryById(this.laundryId).subscribe({
      next: (laundry) => {
        this.laundry = laundry;
        this.loading = false;
        this.filterItemsByLaundry(); // Filter items for the selected laundry
      },
      error: (err) => {
        this.error = 'Failed to load laundry details';
        this.loading = false;
        console.error(err);
      }
    });

    // Option 2: If you need to filter from the full list
    /*
    this.laundryService.getLaundries().pipe(
      map(laundries => laundries.find(laundry => laundry.id === this.laundryId))
    ).subscribe({
      next: (laundry) => {
        this.laundry = laundry || null;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load laundry details';
        this.loading = false;
        console.error(err);
      }
    });
    */
  }

  filterItemsByLaundry() {
    if (!this.laundry) {
      this.filteredItems = [];
      return;
    }

    this.filteredItems = this.items.filter((item) => {
      const belongsToLaundry = this.laundry!.itemIds.includes(item.id); // Check if the item belongs to the selected laundry
      
      // Use the category mapping to match descriptions
      const matchesCategory = this.selectedCategory 
        ? this.categoryMapping[this.selectedCategory]?.some(desc => 
            item.description.toLowerCase() === desc.toLowerCase()
          ) || false
        : true;
        
      const matchesSearchQuery = this.searchQuery
        ? item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      return belongsToLaundry && matchesCategory && matchesSearchQuery;
    });
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category; // Update the selected category
    this.filterItemsByLaundry(); // Re-filter items
  }

  onSearch(): void {
    this.filterItemsByLaundry(); // Re-filter items based on the search query
  }
}
