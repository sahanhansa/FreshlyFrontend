import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent {

  @Input() itemId!: string;
  @Input() title: string = 'Confirm Deletion';
  @Input() message: string = 'Are you sure you want to delete this item? This action cannot be undone.';
  @Input() button1Text: string = 'Yes';
  @Input() button2Text: string = 'No';

  orderType: string = '';

  constructor(private service: ItemService) {}

  onDeleteConfirm() {
    this.service.getDeleteItem(this.itemId).subscribe({
      next: () => {
        console.log('Item deleted successfully');
        // Handle UI feedback or modal close here
      },
      error: err => {
        console.error('Delete failed', err);
      }
    });
  }
}
