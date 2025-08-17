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
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// Interface for items with legacy properties
interface ExtendedItem extends Item {
  id?: number;
  name?: string | null;
  category?: string | null;
  price?: number;
}

@Component({
  selector: 'app-items-list-page',
  standalone: true,
  templateUrl: './items-list-page.component.html',
  styleUrls: ['./items-list-page.component.css'],
  imports: [ItemCardListComponent, CommonModule, ItemCategoryComponent, FormsModule]
})
export class ItemsListPageComponent implements OnInit {
  items: ExtendedItem[] = [];
  filteredItems: ExtendedItem[] = [];
  selectedCategory = 'Ladies'; // Default category
  searchQuery = ''; // Search input value
  laundryId!: number; // Store the selected laundry ID
  selectedLaundry: Laundry | null = null;
  loading = false;
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
    this.laundryId = +this.route.snapshot.paramMap.get('id')!; // Get the laundry ID from the route
    this.loading = true;
    
    // First get the laundry details
    this.laundryService.getLaundryById(this.laundryId)
      .pipe(
        catchError(error => {
          this.error = 'Failed to load laundry details';
          console.error(error);
          return of(null);
        }),
        switchMap(laundry => {
          this.selectedLaundry = laundry;
          
          // Then get the items for this laundry
          return this.itemService.getItems(this.laundryId.toString())
            .pipe(
              catchError(error => {
                this.error = 'Failed to load items';
                console.error(error);
                return of([]);
              })
            );
        })
      )
      .subscribe({
        next: (items) => {
          this.items = this.addLegacyProperties(items);
          this.filterItemsByLaundry();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'An error occurred while loading data';
          this.loading = false;
          console.error(err);
        }
      });
  }
  // Helper to add backward compatibility properties to items
  private addLegacyProperties(items: Item[]): ExtendedItem[] {
    if (!items || !Array.isArray(items)) {
      console.warn('Invalid items data received', items);
      return [];
    }
    
    return items.map(item => {
      try {
        const extendedItem: ExtendedItem = {
          ...item,
          id: item.itemId ? parseInt(item.itemId) : undefined,
          name: item.itemName,
          category: item.categoryName,
          price: item.services && item.services.length > 0 ? item.services[0]?.price || 0 : 0
        };
        return extendedItem;
      } catch (error) {
        console.error('Error processing item:', item, error);
        // Return the original item with basic fallback properties
        return {
          ...item,
          id: undefined,
          name: item.itemName || 'Unknown Item',
          category: item.categoryName || 'Uncategorized',
          price: 0
        };
      }
    });
  }
  filterItemsByLaundry() {
    if (!this.selectedLaundry) {
      this.filteredItems = [];
      return;
    }

    this.filteredItems = this.items.filter((item) => {
      // Use the category mapping to match descriptions
      const matchesCategory = this.selectedCategory 
        ? this.categoryMapping[this.selectedCategory]?.some(desc => 
            (item.description || '').toLowerCase() === desc.toLowerCase() ||
            (item.categoryName || '').toLowerCase() === desc.toLowerCase()
          ) || false
        : true;
        
      // Support both new itemName and legacy name properties for search
      const itemNameValue = item.itemName || item.name || '';
      const matchesSearchQuery = this.searchQuery
        ? itemNameValue.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesSearchQuery;
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
