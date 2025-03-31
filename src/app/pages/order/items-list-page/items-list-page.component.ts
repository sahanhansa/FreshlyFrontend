import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../models/item.model';
import { ItemService } from '../../../services/item.service';
import { LaundryService } from '../../../services/laundry.service';
import { ItemCardListComponent } from "../../../components/order/item-card-list/item-card-list.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { ItemCategoryComponent } from "../../../components/order/item-category/item-category.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-list-page',
  standalone: true,
  templateUrl: './items-list-page.component.html',
  styleUrls: ['./items-list-page.component.css'],
  imports: [ItemCardListComponent, FooterComponent, CommonModule, ItemCategoryComponent, FormsModule]
})
export class ItemsListPageComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  selectedCategory = 'Ladies'; // Default category
  searchQuery = ''; // Search input value
  laundryId!: number; // Store the selected laundry ID
  
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
    this.items = this.itemService.getItems(); // Fetch all items
    this.filterItemsByLaundry(); // Filter items for the selected laundry
  }

  filterItemsByLaundry() {
    const selectedLaundry = this.laundryService.getLaundries().find(laundry => laundry.id === this.laundryId);

    if (!selectedLaundry) {
      this.filteredItems = [];
      return;
    }

    this.filteredItems = this.items.filter((item) => {
      const belongsToLaundry = selectedLaundry.itemIds.includes(item.id); // Check if the item belongs to the selected laundry
      
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
