import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { ItemListComponent } from '../../../components/order/item-list/item-list.component';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Item, ItemCategory } from '../../../models/item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ItemListComponent,
    SearchBarComponent
  ],
  templateUrl: './item-list-page.component.html',
  styleUrls: ['./item-list-page.component.css']
})
export class ItemPageComponent implements OnInit {
  // All unfiltered items fetched from the API
  allItems: Item[] = [];

  // Filtered items to display
  displayedItems: Item[] = [];
  
  // Category tabs
  activeTab: ItemCategory = 'ladies';
  
  // Search query
  searchQuery: string = '';
 
  loading = false; // Indicates if data is currently being fetched
  error = ''; // Holds error message if API call fails
  laundryId: string | null = null; // Laundry ID extracted from the URL parameter

  // Injecting  required services
  constructor(private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.laundryId = (this.route.snapshot.paramMap.get('id'));
    
    // Load items only if we have a valid laundry ID
    if (this.laundryId) {
      this.loadItems();
    } else {
      this.error = 'Laundry ID is missing in the URL.';
    }
  }

  // Method to fetch items from the API for the selected laundry
  loadItems(): void {
    this.loading = true;
    this.error = '';
    
    // Service method call to get items
    this.itemService.getItems(this.laundryId || "").subscribe({
      next: (data) => {
        console.log('Received items:', data);
        this.allItems = data;
        this.filterItemsByCategory();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching items:', err);
        this.error = 'Failed to load items. Please try again.';
        this.loading = false;
      }
    });
  }

  // Method to change the active category tab
  setActiveTab(tab: ItemCategory): void {
    this.activeTab = tab;
    this.filterItemsByCategory();
  }

  // Handler for search bar input changes
  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.filterItemsByCategory();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.filterItems();
  }

  // Method to filter items based on active category and search query
  filterItemsByCategory(): void {
    let filteredItems = this.allItems.filter(item => {
      const category = this.mapCategoryNameToTabCategory(item.categoryName);
      return category === this.activeTab;
    });
    
    // Then apply search filter if there's a query
    if (this.searchQuery.trim()) {
      const searchLower = this.searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        item.itemName?.toLowerCase().includes(searchLower) || 
        item.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Update the displayed items
    this.displayedItems = filteredItems;
  }
  
  // Map backend category names to our frontend category tabs
  mapCategoryNameToTabCategory(categoryName: string | null): ItemCategory {
    if (!categoryName) return 'other';
    
    const lowerCaseName = categoryName.toLowerCase();
    
    // Map to 'category' if it contains category-related terms
    if (lowerCaseName.includes('lady') || lowerCaseName.includes('women') || lowerCaseName === 'ladies') {
      return 'ladies';
    } else if (lowerCaseName.includes('gent') || lowerCaseName.includes('men') || lowerCaseName === 'gents') {
      return 'gents';
    } else if (lowerCaseName.includes('kid') || lowerCaseName.includes('child') || lowerCaseName.includes('baby')) {
      return 'kids';
    } else {
      return 'other';
    }
  }
  
  // Method to retry loading items if the initial load failed
  retryLoading(): void {
    this.loadItems();
  }

  // Fix the filterItems method which was referenced but not defined
  filterItems() {
    this.filterItemsByCategory();
  }
}
