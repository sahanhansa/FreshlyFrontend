import { Component, inject, Input, Output, SimpleChanges } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DriverNavbarComponent } from '../../../components/driver/driver-navbar/driver-navbar.component';
import { OrderDetailsPendingComponent } from '../../../components/driver/order-details-pending/order-details-pending.component';
import { PickupQuestionComponent } from '../../../components/driver/pickup-question/pickup-question.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { PickupDetailsHeaderComponent } from "../../../components/driver/pickup-details-header/pickup-details-header.component";
import { DriverTakenOrderComponent } from '../../../components/driver/driver-taken-order/driver-taken-order.component';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'stream';
import { Action } from 'rxjs/internal/scheduler/Action';
import { PickupOrder, PickupsService } from '@app/services/driver/pickups.service';

@Component({
  standalone: true,
  selector: 'app-pickups-pending-order-details',
  imports: [DriverNavbarComponent, CommonModule,
    OrderDetailsPendingComponent, PickupQuestionComponent, FooterComponent, PickupDetailsHeaderComponent, DriverTakenOrderComponent],

  templateUrl: './pickups-pending-order-details.component.html',
  styleUrl: './pickups-pending-order-details.component.css'
})
export class PickupsPendingOrderDetailsComponent {
  private route = inject(ActivatedRoute);
  private pickupsService = inject(PickupsService);

  @Input() note: string | null = null;

  onOrderConfirmed(event: string) {
    console.log('PickupsPendingOrderDetailsComponent got:', event);
    this.fetchOrderDetails();
  }

  driverId: string | null = null;
  orderId: string = ''; // initialize to empty

  pickupOrder: PickupOrder | null = null;
  ngOnInit(): void {
    this.fetchOrderDetails();
  }

  private fetchOrderDetails() {
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId) {
      this.pickupsService.getPickupById(orderId).subscribe({
        next: (order) => {
          if (order) {
            this.pickupOrder = order;
            this.orderId = order.id;
            this.driverId = order.pickupDriverId || null;
          } else {
            console.warn('No pickup order found for ID:', orderId);
          }
        },
        error: (err) => {
          console.error('Error fetching order by ID:', err);
        }
      });
    } else {
      console.warn('No order ID provided in route.');
    }
  }


  onDriverIdReceived(receivedId: string) {

    console.log('Received driver ID:', this.driverId);
    this.driverId = receivedId || null;
  }

  onInputReceived(note: string) {
    console.log('Received note:', note);
    this.note = note || null;
  }
}
