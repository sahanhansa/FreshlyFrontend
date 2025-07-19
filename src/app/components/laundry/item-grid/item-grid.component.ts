import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaundryItemCardComponent } from '../laundry-item-card/laundry-item-card.component';
import { ItemService } from '../../../services/item.service';

// Interface matching the API response
interface ItemResponse {
  itemId: string;
  itemName: string;
  categoryName: string;
  imageUrl: string;
  services: {
    serviceId: string;
    serviceName: string;
    price: number;
  }[];
}

@Component({
  selector: 'app-item-grid',
  standalone: true,
  imports: [CommonModule, LaundryItemCardComponent],
  templateUrl: './item-grid.component.html'
})
export class ItemGridComponent implements OnInit {
  // Real items from the API
  allItems: ItemResponse[] = [];
  loading: boolean = true;
  error: string | null = null;

  currentPage = 1;
  pageSize = 16;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  public loadItems() {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      this.error = 'Laundry ID not found. Please login again.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.itemService.getItems(laundryId).subscribe({
      next: (items) => {
        this.allItems = items;
        this.loading = false;
        console.log('Loaded items:', items);
      },
      error: (error) => {
        this.error = 'Failed to load items. Please try again.';
        this.loading = false;
        console.error('Error loading items:', error);
      }
    });
  }

  get totalPages() {
    return Math.ceil(this.allItems.length / this.pageSize);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.allItems.slice(start, start + this.pageSize);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
