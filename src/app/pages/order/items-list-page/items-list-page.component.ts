import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item.model';
import { ItemService } from '../../../services/item.service';
import { ItemCategoryComponent } from '../../../components/order/item-category/item-category.component';
import { ItemCardListComponent } from '../../../components/order/item-card-list/item-card-list.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-items-list-page',
  standalone: true,
  imports: [ItemCategoryComponent, ItemCardListComponent, FooterComponent],
  templateUrl: './items-list-page.component.html',
  styleUrls: ['./items-list-page.component.css']
})
export class ItemsListPageComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.filterItemsByCategory('Ladies'); // Default category
  }

  onCategorySelected(category: string): void {
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
