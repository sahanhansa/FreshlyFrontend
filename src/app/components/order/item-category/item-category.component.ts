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
  @Output() categorySelected = new EventEmitter<string>(); // Emit selected category to parent

  selectedCategory = 'Ladies'; // Default category
  categories = [
    { name: 'Ladies' },
    { name: 'Gents' },
    { name: 'Kids' },
    { name: 'Other' }
  ];

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category); // Emit the selected category
  }
}