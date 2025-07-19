import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MarksToDoneButtonComponent } from '../marks-to-done-button/marks-to-done-button.component';
import { DeliveryService } from '@app/services/driver/delivery.service';

@Component({
  selector: 'app-delivery-question-1',
  imports: [MarksToDoneButtonComponent],
  templateUrl: './delivery-question-1.component.html',
  styleUrl: './delivery-question-1.component.css'
})
export class DeliveryQuestion1Component {
   @Input() orderId: string = '';
  @Output() confirmed2 = new EventEmitter<string>();
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

    this.deliveryService.MarksToPickDeliver(this.orderId).subscribe({
      next: response => {
        console.log('Order successfully marked as taken.');
        this.confirmed2.emit(this.orderId);
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
