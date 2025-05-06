import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { ItemListComponent } from '../../../components/order/item-list/item-list.component';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { Item, ItemCategory } from '../../../models/item.model';

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
  styleUrl: './item-list-page.component.css'
})
export class ItemPageComponent implements OnInit {
  // All items loaded from service
  allItems: Item[] = [];
  
  // Filtered items to display
  displayedItems: Item[] = [];
  
  // Category tabs
  activeTab: ItemCategory = 'ladies';
  
  // Search query
  searchQuery: string = '';
  
  // Loading and error states
  loading = false;
  error = '';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = '';
    
    this.itemService.getItems().subscribe({
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

  setActiveTab(tab: ItemCategory): void {
    this.activeTab = tab;
    this.filterItemsByCategory();
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.filterItemsByCategory();
  }

  filterItemsByCategory(): void {
    // Filter by category using the categoryName from the API
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
    
    this.displayedItems = filteredItems;
  }
  
  // Map backend category names to our frontend category tabs
  mapCategoryNameToTabCategory(categoryName: string | null): ItemCategory {
    if (!categoryName) return 'other';
    
    const lowerCaseName = categoryName.toLowerCase();
    
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
  
  retryLoading(): void {
    this.loadItems();
  }
}
