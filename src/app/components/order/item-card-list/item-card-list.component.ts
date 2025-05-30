import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Item, ItemCategory } from '../../../models/item.model';
import { ItemCardComponent } from "../item-card/item-card.component";
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf

interface ExtendedItem extends Item {
  price?: number;
  category?: string;
}

@Component({
  selector: 'app-item-card-list',
  standalone: true,
  templateUrl: './item-card-list.component.html',
  styleUrls: ['./item-card-list.component.css'],
  imports: [ItemCardComponent, CommonModule] // Import ItemCardComponent and CommonModule for structural directives
})
export class ItemCardListComponent implements OnChanges, OnInit {
  @Input() items: Item[] = []; // Accepts the list of items to display
  @Input() category: string = ''; // Accepts the selected category
  @Output() itemsSelected = new EventEmitter<any[]>(); // Emits selected items
  
  selectedItems: Item[] = [];
  
  ngOnInit(): void {
    // If no items are provided, use mock items
    if (this.items.length === 0) {
      this.items = this.mockItems;
      this.filterItemsByCategory();
    }
  }
  
  // Mock data for testing
  mockItems: ExtendedItem[] = [
    { 
      itemId: '1', 
      itemName: 'Ladies Blouse', 
      services: [{ serviceId: '1', serviceName: 'Wash', price: 5.99 }],
      description: 'Ladies blouse washing', 
      image: 'assets/blouse.png',
      categoryName: 'Ladies',
      // Legacy properties for backwards compatibility
      price: 5.99,
      category: 'Ladies'
    },
    { 
      itemId: '2', 
      itemName: 'Mens Shirt', 
      services: [{ serviceId: '1', serviceName: 'Wash', price: 6.99 }],
      description: 'Mens shirt cleaning', 
      image: 'assets/shirt.png',
      categoryName: 'Gents',
      // Legacy properties for backwards compatibility
      price: 6.99,
      category: 'Gents'
    },
    { 
      itemId: '3', 
      itemName: 'Kids Frock', 
      services: [{ serviceId: '1', serviceName: 'Wash', price: 4.99 }],
      description: 'Kids frock washing', 
      image: 'assets/baby-frock.png',
      categoryName: 'Kids',
      // Legacy properties for backwards compatibility
      price: 4.99,
      category: 'Kids'
    },
    { 
      itemId: '4', 
      itemName: 'Bedsheets', 
      services: [{ serviceId: '1', serviceName: 'Wash', price: 8.99 }],
      description: 'Bedsheets cleaning', 
      image: 'assets/bedsheets.png',
      categoryName: 'Home',
      // Legacy properties for backwards compatibility
      price: 8.99,
      category: 'Home'
    }
  ];
  
  ngOnChanges(changes: SimpleChanges): void {
    // Filter items when category changes
    if (changes['category']) {
      this.filterItemsByCategory();
    }
  }
  
  filterItemsByCategory(): void {
    if (!this.category) {
      // If no category is selected, emit all items
      this.itemsSelected.emit(this.items);
      return;
    }
    
    // Filter items that might belong to this category based on name or category
    const filteredItems = this.items.filter(item => {
      const itemName = item.itemName?.toLowerCase() || '';
      const categoryName = item.categoryName?.toLowerCase() || '';
      const description = item.description?.toLowerCase() || '';
      
      return itemName.includes(this.category.toLowerCase()) || 
             categoryName.includes(this.category.toLowerCase()) ||
             description.includes(this.category.toLowerCase());
    });
    
    this.itemsSelected.emit(filteredItems);
  }
}
