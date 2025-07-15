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
  @Output() totalItemChange = new EventEmitter<number>();

  deliveries: DeliveryOrder[] = [];
  filteredDeliveries: DeliveryOrder[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDeliveries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['currentPage']) {
      this.filterDeliveries();
    }
  }

  get sortedDeliveries(): DeliveryOrder[] {
    return this.filteredDeliveries.slice().sort((a, b) => {
      if (a.status === 'Delivery Pending' && b.status === 'Delivery Complete') return -1;
      if (a.status === 'Delivery Complete' && b.status === 'Delivery Pending') return 1;
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

    this.filteredDeliveries = this.deliveries.filter(delivery =>
      delivery.customerName.toLowerCase().includes(query)
    );

    this.totalItemChange.emit(this.filteredDeliveries.length);
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(['/deliveries-pending-order-details', orderId]);
  }
}
