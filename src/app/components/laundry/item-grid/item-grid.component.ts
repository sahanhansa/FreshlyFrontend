import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LaundryItemCardComponent } from '../laundry-item-card/laundry-item-card.component';
import { ItemService } from '../../../services/item.service';
import { PaginationComponent } from '../pagination/pagination.component';

// Interface matching the API response
interface ItemResponse {
  itemId: string;
  itemName: string;
  categoryName: string;
  description?: string;
  imageUrl: string;
  services: {
    serviceId: string;
    serviceName: string;
    price: number;
  }[];
  garmentTypes?: {
    garmentTypeId: string;
    garmentTypeName: string;
  }[];
  materials?: string[];
}

@Component({
  selector: 'app-item-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, LaundryItemCardComponent, PaginationComponent],
  templateUrl: './item-grid.component.html'
})
export class ItemGridComponent implements OnInit {
  // Real items from the API
  allItems: ItemResponse[] = [];
  loading: boolean = true;
  error: string | null = null;

  currentPage = 1;
  pageSize = 10; // Set to 10 rows per page

  categories: string[] = ['Ladies', 'Gents', 'Kids', 'Other'];
  selectedCategory: string = 'All';
  sortAZ: boolean = false;
  selectedService: string = 'All';
  availableServices: string[] = [];
  isServiceDropdownOpen: boolean = false;

  get filteredItems(): ItemResponse[] {
    let items = this.allItems;
    // Category filter
    if (this.selectedCategory !== 'All') {
      items = items.filter(item => item.categoryName?.toLowerCase() === this.selectedCategory.toLowerCase());
    }
    // Service filter
    if (this.selectedService !== 'All') {
      items = items.filter(item => item.services.some(s => s.serviceName === this.selectedService));
    }
    // A-Z sort
    if (this.sortAZ) {
      items = [...items].sort((a, b) =>
        (a.itemName || '').localeCompare(b.itemName || '', undefined, { sensitivity: 'base' })
      );
    }
    return items;
  }

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
        // Compute available services and materials
        const serviceSet = new Set<string>();
        for (const item of items) {
          item.services?.forEach((s: { serviceName: string }) => serviceSet.add(s.serviceName));
        }
        this.availableServices = Array.from(serviceSet);
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
    return Math.ceil(this.filteredItems.length / this.pageSize);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  setSortAZ(val: boolean) {
    this.sortAZ = val;
  }
  setService(service: string) {
    this.selectedService = service;
    this.currentPage = 1;
  }

  toggleServiceDropdown(): void {
    this.isServiceDropdownOpen = !this.isServiceDropdownOpen;
  }

  selectService(service: string): void {
    this.selectedService = service;
    this.isServiceDropdownOpen = false;
    this.currentPage = 1;
  }
}
