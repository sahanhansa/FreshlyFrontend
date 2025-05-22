import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../../../services/delivery.service'; 
import { DeliveryOrder } from '../../../services/delivery.service'; 

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delivery-order-card',
  templateUrl: './delivery-order-card.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./delivery-order-card.component.css']
})
export class DeliveryOrderCardComponent implements OnInit {
  deliveries: DeliveryOrder[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDeliveries();  // Fetch deliveries when the component initializes
  }

  // Fetch deliveries from the service
  getDeliveries(): void {
    this.deliveryService.getAllDeliveries().subscribe({
      next: (data) => {
        this.deliveries = data;  // Assign the fetched data to the deliveries array
      },
      error: (error) => {
        console.error('Error fetching deliveries:', error); 
      }
    });
  }


  get sortedDeliveries(): DeliveryOrder[] {
    return this.deliveries.slice().sort((a, b) => {
      if (a.status === 'Delivery Pending' && b.status === 'Delivery Complete') return -1; // 'Delivery Pending' to top
      if (a.status === 'Delivery Complete' && b.status === 'Delivery Pending') return 1;  // 'Delivery Complete' to bottom
      return 0;  
    });
  }

  // Redirect to the order details page
  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/deliveries-pending-order-details', orderId]);
  }
}
