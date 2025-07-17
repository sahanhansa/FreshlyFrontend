import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaundryItemCardComponent } from '../laundry-item-card/laundry-item-card.component';

@Component({
  selector: 'app-item-grid',
  standalone: true,
  imports: [CommonModule, LaundryItemCardComponent],
  templateUrl: './item-grid.component.html'
})
export class ItemGridComponent {
  // 30 placeholder items to simulate a dataset
  allItems = Array.from({ length: 30 }, (_, i) => i + 1);

  currentPage = 1;
  pageSize = 16;

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
