import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item.model';
import { ItemService } from '../../../services/item.service';
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
  searchQuery = ''; // Search query for filtering items

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.filterItemsByCategory(this.selectedCategory); // Default category
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.searchQuery = ''; // Reset search query when category changes
    this.filterItemsByCategory(category);
  }

  onSearch(): void {
    this.filterItemsByCategory(this.selectedCategory); // Reapply filtering with the search query
  }

  private filterItemsByCategory(category: string): void {
    const categoryMapping: { [key: string]: string[] } = {
      Ladies: ['Frock', 'Blouse', 'T-shirt', 'Shirt', 'Denim', 'Saree', 'Skirt', 'Dress'],
      Gents: ['Shirt', 'Trousers', 'T-shirt', 'Shorts', 'Denim', 'Suit', 'Jacket'],
      Kids: ['Baby Frock', 'Baby T-shirt', 'Baby Shorts', 'Baby Dress'],
      Other: ['Curtains', 'Bedsheets', 'Table Clothes', 'Scarf', 'Gloves', 'Winter wear']
    };

    // Filter items by category and search query
    this.filteredItems = this.items.filter(item =>
      categoryMapping[category]?.includes(item.name) &&
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
