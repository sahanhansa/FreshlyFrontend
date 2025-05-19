import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PickupsService, PickupOrder } from '../../../services/pickups.service';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pickup-order-card',
  standalone: true,
  templateUrl: './pickup-order-card.component.html',
  styleUrls: ['./pickup-order-card.component.css'],
  imports: [CommonModule, RouterLink]
})
export class PickupOrderCardComponent implements OnInit {
  pickups: PickupOrder[] = [];

  constructor(
    @Inject(PickupsService) private pickupsService: PickupsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPickups();
  }

  /** Returns pickups sorted with 'Pickup Pending' first */
  get sortedPickups(): PickupOrder[] {
    return this.pickups.slice().sort((a, b) => {
      if (a.status === 'Pickup Pending' && b.status === 'Pickup Complete') return -1;
      if (a.status === 'Pickup Complete' && b.status === 'Pickup Pending') return 1;
      return 0;
    });
  }

  /**  Fetch all pickup orders */
  getAllPickups(): void {
    this.pickupsService.getAllPickups().subscribe({
      next: (data) => {
        this.pickups = data;
      },
      error: (error) => {
        console.error('Error fetching pickups:', error);
      }
    });
  }

  
}
