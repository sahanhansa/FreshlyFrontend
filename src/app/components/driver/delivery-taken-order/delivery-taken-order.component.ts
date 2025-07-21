import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DeliveryService } from '@app/services/driver/delivery.service';
import { PickupsService } from '@app/services/driver/pickups.service';

@Component({
  selector: 'app-delivery-taken-order',
  imports: [],
  templateUrl: './delivery-taken-order.component.html',
  styleUrl: './delivery-taken-order.component.css'
})
export class DeliveryTakenOrderComponent {

  @Input() orderId: string = '';
  driverId: string | null = localStorage.getItem('userId');
  @Output() confirmed1 = new EventEmitter<string>();
  isSubmitting: boolean = false;
  constructor(
    @Inject(DeliveryService) private deliveryService: DeliveryService,

  ) { }

  confirmPickup() {
    console.log('taken confirmed for order:', this.orderId);

    if (!this.orderId) {
      console.error('No orderId provided');
      return;
    }

    this.isSubmitting = true;

    this.deliveryService.MarksToTakeDeliver(this.orderId).subscribe({
      next: response => {
        console.log('Order successfully marked as taken.');
        this.confirmed1.emit(this.orderId);
      },
      error: err => {
        console.error('Error during mark to take:', err);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
