import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCategoryComponent } from '../item-category/item-category.component';

@Component({
  selector: 'app-item-category-selection',
  standalone: true,
  imports: [CommonModule, ItemCategoryComponent],
  templateUrl: './item-category-selection.component.html',
  styleUrls: ['./item-category-selection.component.css']
})

//component containing all categories
export class ItemCategorySelectionComponent {
  categories = signal([ //signals are used to ennable reactive state mgt
    { icon: 'assets/ladies.png', label: 'Ladies', active: true },
    { icon: 'assets/gents.png', label: 'Gents', active: false },
    { icon: 'assets/kids.png', label: 'Kids', active: false },
    { icon: 'assets/other.png', label: 'Other', active: false }
  ]);

  //method to select a category and update the active state
  selectCategory(index: number) {
    this.categories.update((categories) => {
      return categories.map((c, i) => ({ ...c, active: i === index }));
    });
  }
}
