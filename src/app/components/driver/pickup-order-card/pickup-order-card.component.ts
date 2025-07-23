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
  @Input() isOwnSearch: boolean = false;
  @Output() totalItemChange = new EventEmitter<number>();

  userId: string | null = localStorage.getItem('userId');


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
    if (changes['searchQuery'] || changes['currentPage'] || changes['isOwnSearch']) {
      this.filterOrderCard();
    }
    console.log('change isOwnSearch:', this.isOwnSearch , this.userId);
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
  // filterOrderCard(): void {
  //   const query = this.searchQuery?.toLowerCase() || '';

  //   this.filteredPickUps = this.pickups.filter(pickup => {
  //     return pickup.customerName.toLowerCase().includes(query);
  //   });
    
  // this.totalItemChange.emit(this.filteredPickUps.length);
  // }

  /** Apply search filter */
filterOrderCard(): void {
  const query = this.searchQuery?.toLowerCase() || '';

  this.filteredPickUps = this.pickups.filter(pickup => {
    const matchesQuery = pickup.customerName.toLowerCase().includes(query);

    if (this.isOwnSearch) {
      // Own search: show only this driver’s orders
      return matchesQuery && pickup.pickupDriverId === this.userId;
    } else {
      // Global search: show only unassigned, placed orders
      return matchesQuery && pickup.pickupDriverId === null && pickup.status === 'order placed';
    }
  });

  if (this.isOwnSearch) {
    // ✅ Only sort when doing own search
    this.filteredPickUps.sort((a, b) => {
      const aAssigned = a.status === 'order placed' && a.pickupDriverId === this.userId;
      const bAssigned = b.status === 'order placed' && b.pickupDriverId === this.userId;

      if (aAssigned === bAssigned) return 0;
      return aAssigned ? -1 : 1;
    });
  }

  this.totalItemChange.emit(this.filteredPickUps.length);
}




}