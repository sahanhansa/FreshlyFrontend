import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PickupsService, PickupOrder } from '../../../services/driver/pickups.service';


@Component({
  selector: 'app-order-details-pending',
  standalone: true,
  imports: [
    CommonModule
    
   
  ],
  templateUrl: './order-details-pending.component.html',
  styleUrls: ['./order-details-pending.component.css']
})
export class OrderDetailsPendingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pickupsService = inject(PickupsService);

  pickupOrder: PickupOrder | null = null;

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.pickupsService.getPickupById(orderId).subscribe({
        next: (order) => {
          this.pickupOrder = order;
        },
        error: (err) => {
          console.error('Error fetching order by ID:', err);
        }
      });
    } else {
      console.warn('No order ID provided in route.');
    }
  }
}
