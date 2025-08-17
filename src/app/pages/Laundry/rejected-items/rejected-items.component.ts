import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RejectedItemService } from '../../../services/rejected-item.service';
import { RejectedItem } from '../../../models/rejected-item.model';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from '@app/components/shared/footer/footer.component';
import { PaginationComponent } from '@app/components/shared/pagination/pagination.component';
import { SearchBarComponent } from '../../../components/laundry/search-bar/search-bar.component';

@Component({
  selector: 'app-rejected-items',
  imports: [CommonModule, FormsModule,RouterModule, NavbarComponent,FooterComponent, PaginationComponent, SearchBarComponent],
  templateUrl: './rejected-items.component.html'
})
export class RejectedItemsComponent implements OnInit {
  rejectedItems: RejectedItem[] = [];
  loading = false;
  currentPage = 1;
  pageSize = 10;
  searchText: string = '';

  get filteredItems() {
    if (!this.searchText.trim()) return this.rejectedItems;
    
    const searchLower = this.searchText.toLowerCase();
    return this.rejectedItems.filter(item => 
      item.orderId.toLowerCase().includes(searchLower) ||
      (item.itemName && item.itemName.toLowerCase().includes(searchLower)) ||
      (item.reason && item.reason.toLowerCase().includes(searchLower)) ||
      (item.rejectedBy && item.rejectedBy.toLowerCase().includes(searchLower))
    );
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
    this.currentPage = 1; // Reset to first page when searching
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
