import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService, DeliveryOrder } from '../../../services/driver/delivery.service';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delivery-order-card',
  standalone: true,
  templateUrl: './delivery-order-card.component.html',
  styleUrls: ['./delivery-order-card.component.css'],
  imports: [CommonModule, RouterLink]
})
export class DeliveryOrderCardComponent implements OnInit, OnChanges {

  @Input() searchQuery: string = '';
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Input() isOwnSearch: boolean = false;
  @Output() totalItemChange = new EventEmitter<number>();

  userId: string | null = localStorage.getItem('userId');

  deliveries: DeliveryOrder[] = [];
  filteredDeliveries: DeliveryOrder[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDeliveries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['currentPage'] ||changes['isOwnSearch']) {
      this.filterDeliveries();
    }
    console.log('change isOwnSearch:', this.isOwnSearch, this.userId);
  }

  get sortedDeliveries(): DeliveryOrder[] {
    return this.filteredDeliveries.slice().sort((a, b) => {
      if (a.status === 'finished processing' && b.status === 'delivered') return -1;
      if (a.status === 'delivered' && b.status === 'finished processing') return 1;
      return 0;
    });
  }

  get pagedDeliveries(): DeliveryOrder[] {
    const sorted = this.sortedDeliveries;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return sorted.slice(start, start + this.itemsPerPage);
  }

  getDeliveries(): void {
    this.deliveryService.getAllDeliveries().subscribe({
      next: (data) => {
        this.deliveries = data;
        this.filterDeliveries();
      },
      error: (error) => {
        console.error('Error fetching deliveries:', error);
      }
    });
  }

  filterDeliveries(): void {
    const query = this.searchQuery?.toLowerCase() || '';

this.filteredDeliveries = this.deliveries.filter(delivery => {
  const matchesQuery =
    delivery.address.toLowerCase().includes(query) ||
    delivery.laundryName.toLowerCase().includes(query);

  if (this.isOwnSearch) {
    // Own search: only show this driver’s orders
    return matchesQuery && delivery.deliverDriver === this.userId;
  } else {
    // Global search: show only unassigned placed orders
    return matchesQuery && delivery.deliverDriver === null && delivery.status === 'finished processing';
  }
});

    this.totalItemChange.emit(this.filteredDeliveries.length);
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(['/deliveries-pending-order-details', orderId]);
  }


  
}
