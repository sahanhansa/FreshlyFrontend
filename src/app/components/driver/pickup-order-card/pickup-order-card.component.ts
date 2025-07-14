import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  pickups: PickupOrder[] = [];
  filteredPickUps: PickupOrder[] = [];

  constructor(
    @Inject(PickupsService) private pickupsService: PickupsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPickups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
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
  }
}
