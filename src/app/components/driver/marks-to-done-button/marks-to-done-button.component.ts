import { Component, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { PickupsService } from '@app/services/driver/pickups.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-marks-to-done-button',
  imports: [],
  templateUrl: './marks-to-done-button.component.html',
  styleUrl: './marks-to-done-button.component.css'
})
export class MarksToDoneButtonComponent {

  constructor(
    @Inject(PickupsService) private pickupsService: PickupsService,

  ) { }

  @Input() orderId: string = '';
  @Output() confirmed1 = new EventEmitter<string>();

  confirmPickup() {
    console.log('Pickup confirmed for order:', this.orderId);

    if (!this.orderId) {
      console.error('No orderId provided');
      return;
    }

    this.pickupsService.MarksToTake(this.orderId).subscribe({
      next: response => {
          console.log('Order successfully marked as taken.');
          this.confirmed1.emit(this.orderId);
          // Optionally update UI or notify user here
      },
      error: err => {
        console.error('Error during mark to take:', err);
      }
    });

  }

}
