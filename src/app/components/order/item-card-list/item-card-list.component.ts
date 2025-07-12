import { Component, Input } from '@angular/core';
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
export class ItemCardListComponent {
  @Input() items: Item[] = []; // Accepts the list of items to display
}
