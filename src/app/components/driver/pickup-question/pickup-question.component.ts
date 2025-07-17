import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MarksToDoneButtonComponent } from '../marks-to-done-button/marks-to-done-button.component';
import { PickupsService } from '@app/services/driver/pickups.service';

@Component({
  selector: 'app-pickup-question',
  imports: [MarksToDoneButtonComponent],
  templateUrl: './pickup-question.component.html',
  styleUrl: './pickup-question.component.css'
})
export class PickupQuestionComponent {
  @Input() note: string | null = null;
  @Input() orderId: string | null = null;
  @Output() orderedConfirmed = new EventEmitter<string>();
  constructor(
    @Inject(PickupsService) private pickupsService: PickupsService,

  ) { }

  confirmPickup() {
    console.log('Pickup confirmed for order:', this.orderId);
    console.log('Pickup confirmed for order:', this.note);
    if (!this.orderId) {
      console.error('No orderId provided');
      return;
    }

    this.pickupsService.MarksToDelivered(this.orderId, this.note).subscribe({
      next: response => {
        console.log('Order successfully marked as delivered.');
        this.orderedConfirmed.emit("success");
        // Optionally update UI or notify user here
      },
      error: err => {
        console.error('Error during mark to delivered:', err);
      }
    });

  }

}
