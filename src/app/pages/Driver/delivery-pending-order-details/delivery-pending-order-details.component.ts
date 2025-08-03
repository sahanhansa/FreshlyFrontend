import { Component, inject, Input } from '@angular/core';
import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { DeliveryTaskHeaderComponent } from "../../../components/driver/delivery-task-header/delivery-task-header.component";
import { DeliveryOrderDetailsComponent } from "../../../components/driver/delivery-order-details/delivery-order-details.component";
import { DeliveryQuestion1Component } from "../../../components/driver/delivery-question-1/delivery-question-1.component";
import { DeliveryQuestion2Component } from "../../../components/driver/delivery-question-2/delivery-question-2.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { OrderDetailsHeaderComponent } from "../../../components/driver/order-details-header/order-details-header.component";
import { DeliveryTakenOrderComponent } from "../../../components/driver/delivery-taken-order/delivery-taken-order.component";
import { DeliveryOrder, DeliveryService } from '@app/services/driver/delivery.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delivery-pending-order-details',
  imports: [DriverNavbarComponent, CommonModule, DeliveryOrderDetailsComponent, DeliveryQuestion1Component, DeliveryQuestion2Component, FooterComponent, OrderDetailsHeaderComponent, DeliveryTakenOrderComponent],
  templateUrl: './delivery-pending-order-details.component.html',
  styleUrl: './delivery-pending-order-details.component.css'
})
export class DeliveryPendingOrderDetailsComponent {
  private route = inject(ActivatedRoute);
  private deliveryService = inject(DeliveryService);
   @Input() note: string | null = null;

  deliveryOrder: DeliveryOrder | null = null;
  driverId: string | null = null;
  orderId: string = ''; // initialize to empty

  ngOnInit(): void {
    this.fetchOrderDetails();
  }
  onOrderConfirmed(event: any) {
    console.log('DeliveryPendingOrderDetailsComponent got:', event);
    this.fetchOrderDetails();
  }


  private fetchOrderDetails() {
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId) {
      this.deliveryService.getDeliveryById(orderId).subscribe({
        next: (order) => {
          if (order) {
            console.log('Fetched delivery order:', order);
            
            this.deliveryOrder = order;
            this.orderId = order.id;
            this.driverId = order.deliverDriver || null;
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

  onInputReceived(note: string) {
    console.log('Received note:', note);
    this.note = note || null;
  }
}
