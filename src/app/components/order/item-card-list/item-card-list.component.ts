import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Item } from '../../../models/item.model';
import { ItemCardComponent } from "../item-card/item-card.component";
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf

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
  mockItems: Item[] = [
    { 
      id: 1, 
      name: 'Ladies Blouse', 
      price: 5.99, 
      description: 'Ladies blouse washing', 
      image: 'assets/blouse.png',
      category: 'Ladies'
    },
    { 
      id: 2, 
      name: 'Mens Shirt', 
      price: 6.99, 
      description: 'Mens shirt cleaning', 
      image: 'assets/shirt.png',
      category: 'Gents'
    },
    { 
      id: 3, 
      name: 'Kids Frock', 
      price: 4.99, 
      description: 'Kids frock washing', 
      image: 'assets/baby-frock.png',
      category: 'Kids'
    },
    { 
      id: 4, 
      name: 'Bedsheets', 
      price: 8.99, 
      description: 'Bedsheets cleaning', 
      image: 'assets/bedsheets.png',
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
    // Since the Item model doesn't have a category field directly
    // We'll use item's name or description to match the category
    // This is a temporary solution until the model is updated
    
    if (!this.category) {
      // If no category is selected, emit all items
      this.itemsSelected.emit(this.items);
      return;
    }
    
    // Filter items that might belong to this category based on name
    const filteredItems = this.items.filter(item => 
      item.name.toLowerCase().includes(this.category.toLowerCase()) || 
      item.description.toLowerCase().includes(this.category.toLowerCase())
    );
    
    this.itemsSelected.emit(filteredItems);
  }
}
