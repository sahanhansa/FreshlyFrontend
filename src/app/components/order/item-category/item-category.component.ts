import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent {
  @Output() categorySelected = new EventEmitter<string>(); // Emits the selected category

  categories = [
    { name: 'Ladies', image: './assets/ladies.png' },
    { name: 'Gents', image: './assets/gents.png' },
    { name: 'Kids', image: './assets/kids.png' },
    { name: 'Other', image: './assets/other.png' }
  ];

  selectedCategory = 'Ladies'; // Default selected category

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category); // Emit the selected category
  }
}
