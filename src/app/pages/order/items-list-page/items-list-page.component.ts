import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item.model';
import { ItemService } from '../../../services/item.service';
import { ItemCardListComponent } from "../../../components/order/item-card-list/item-card-list.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf

@Component({
  selector: 'app-items-list-page',
  standalone: true,
  templateUrl: './items-list-page.component.html',
  styleUrls: ['./items-list-page.component.css'],
  imports: [ItemCardListComponent, FooterComponent, CommonModule] // Import ItemCardListComponent and CommonModule for structural directives
})
export class ItemsListPageComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  selectedCategory = 'Ladies'; // Default category
  categories = [
    { name: 'Ladies' },
    { name: 'Gents' },
    { name: 'Kids' },
    { name: 'Other' }
  ];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.filterItemsByCategory(this.selectedCategory); // Default category
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.filterItemsByCategory(category);
  }

  private filterItemsByCategory(category: string): void {
    const categoryMapping: { [key: string]: string[] } = {
      Ladies: ['Frock', 'Blouse', 'T-shirt', 'Shirt', 'Denim', 'Saree', 'Skirt', 'Dress'],
      Gents: ['Shirt', 'Trousers', 'T-shirt', 'Shorts', 'Denim', 'Suit', 'Jacket'],
      Kids: ['Baby Frock', 'Baby T-shirt', 'Baby Shorts', 'Baby Dress'],
      Other: ['Curtains', 'Bedsheets', 'Table Clothes', 'Scarf', 'Gloves', 'Winter wear']
    };

    this.filteredItems = this.items.filter(item =>
      categoryMapping[category]?.includes(item.name)
    );
  }
}
