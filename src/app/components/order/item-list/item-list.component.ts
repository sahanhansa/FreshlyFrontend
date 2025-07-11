import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../../models/item.model';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  // Input property to receive an array of items from the parent component
  @Input() items: Item[] = [];
}
