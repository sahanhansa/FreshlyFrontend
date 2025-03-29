import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
//single category component
export class ItemCategoryComponent {
  @Input() icon!: string; //!means that value will be provided in the parent component
  @Input() label!: string;
  @Input() isActive: boolean = false;
}
