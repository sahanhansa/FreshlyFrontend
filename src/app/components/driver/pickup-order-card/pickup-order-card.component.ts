import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, output, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PickupsService, PickupOrder } from '../../../services/driver/pickups.service';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pickup-order-card',
  standalone: true,
  templateUrl: './pickup-order-card.component.html',
  styleUrls: ['./pickup-order-card.component.css'],
  imports: [CommonModule, RouterLink],
})
export class PickupOrderCardComponent implements OnInit, OnChanges {

  @Input() searchQuery: string = ''; // default to empty
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Output() totalItemChange = new EventEmitter<number>();

  pickups: PickupOrder[] = [];
  filteredPickUps: PickupOrder[] = [];

  constructor(
    @Inject(PickupsService) private pickupsService: PickupsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPickups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['currentPage']) {
      this.filterOrderCard();
    }
  }

  /** Returns filtered pickups sorted with 'Pickup Pending' first */
  get sortedPickups(): PickupOrder[] {
    return this.filteredPickUps.slice().sort((a, b) => {
      if (a.status === 'Pickup Pending' && b.status === 'Pickup Complete') return -1;
      if (a.status === 'Pickup Complete' && b.status === 'Pickup Pending') return 1;
      return 0;
    });
  }

   get pagedPickups(): PickupOrder[] {
    const sorted = this.filteredPickUps.slice().sort((a, b) => {
      if (a.status === 'Pickup Pending' && b.status === 'Pickup Complete') return -1;
      if (a.status === 'Pickup Complete' && b.status === 'Pickup Pending') return 1;
      return 0;
    });

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return sorted.slice(start, start + this.itemsPerPage);
  }

  /** Fetch all pickup orders */
  getAllPickups(): void {
    this.pickupsService.getAllPickups().subscribe({
      next: (data: PickupOrder[]) => {
        this.pickups = data;
        this.filterOrderCard(); // Filter right after fetching
      },
      error: (error: any) => {
        console.error('Error fetching pickups:', error);
      }
    });
  }

  /** Apply search filter */
  filterOrderCard(): void {
    const query = this.searchQuery?.toLowerCase() || '';

    this.filteredPickUps = this.pickups.filter(pickup => {
      return pickup.customerName.toLowerCase().includes(query);
    });
    
  this.totalItemChange.emit(this.filteredPickUps.length);
  }

  

}