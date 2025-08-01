import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RejectedItemService } from '../../../services/rejected-item.service';
import { RejectedItem } from '../../../models/rejected-item.model';
import { FooterComponent } from '@app/components/shared/footer/footer.component';
import { PaginationComponent } from '@app/components/shared/pagination/pagination.component';

@Component({
  selector: 'app-rejected-items',
  imports: [CommonModule, FormsModule,RouterModule,FooterComponent, PaginationComponent],
  templateUrl: './rejected-items.component.html'
})
export class RejectedItemsComponent implements OnInit {
  rejectedItems: RejectedItem[] = [];
  loading = false;
  currentPage = 1;
  pageSize = 10;

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.rejectedItems.slice(start, start + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  constructor(private rejectedItemService: RejectedItemService) {}

  ngOnInit(): void {
    const laundryId = localStorage.getItem('laundryId');
    if (laundryId) {
      this.loading = true;
      this.rejectedItemService.getRejectedItemsByLaundryV2(laundryId).subscribe({
        next: items => {
          console.log('Rejected items payload:', items); // Debug log
          this.rejectedItems = items;
          this.loading = false;
        },
        error: (err) => {
          console.error('Rejected items error:', err); // Debug log
          this.loading = false;
        }
      });
    }
  }
}
