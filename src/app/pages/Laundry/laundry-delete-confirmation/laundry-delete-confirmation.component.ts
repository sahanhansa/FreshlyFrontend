import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteConfirmationComponent } from '@app/components/laundry/delete-confirmation/delete-confirmation.component';
import { ItemService } from '@app/services/item.service';

@Component({
  selector: 'app-laundry-delete-confirmation',
  standalone: true,
  imports: [DeleteConfirmationComponent],
  templateUrl: './laundry-delete-confirmation.component.html'
})
export class LaundryDeleteConfirmationComponent implements OnInit {
  itemId: string = '';
  itemName: string = '';
  isDeleting: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    // Get itemId from route params
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
    });

    // Get item details from router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as any;
      this.itemName = state.itemName || 'Unknown Item';
    }
  }

  onDeleteConfirmed(itemId: string) {
    console.log('Deleting item:', itemId);
    this.isDeleting = true;
    
    this.itemService.deleteItem(itemId).subscribe({
      next: () => {
        console.log('Item deleted successfully');
        this.isDeleting = false;
        alert('Item deleted successfully!');
        this.router.navigate(['/laundry-items']);
      },
      error: (error) => {
        console.error('Delete failed:', error);
        this.isDeleting = false;
        alert('Error: ' + error.message);
      }
    });
  }

  onDeleteCancelled() {
    // Navigate back to edit page
    this.router.navigate(['/laundry-edit-item', this.itemId]);
  }
} 