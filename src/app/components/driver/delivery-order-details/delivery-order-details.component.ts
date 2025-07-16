import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService, DeliveryOrder } from '../../../services/driver/delivery.service';
import { DriverNavbarComponent } from "../driver-navbar/driver-navbar.component";
import { OrderDetailsHeaderComponent } from "../order-details-header/order-details-header.component";
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-delivery-order-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './delivery-order-details.component.html',
  styleUrls: ['./delivery-order-details.component.css']
})
export class DeliveryOrderDetailsComponent implements OnInit {
  deliveryOrder: DeliveryOrder | null = null;

  constructor(private route: ActivatedRoute, private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.deliveryService.getDeliveryById(orderId).subscribe({
        next: (order) => {
          this.deliveryOrder = order;
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
