import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MarksToDoneButtonComponent } from '../../../components/driver/marks-to-done-button/marks-to-done-button.component';

@Component({
  selector: 'app-driver-taken-order',
  imports: [MarksToDoneButtonComponent ],
  templateUrl:'./driver-taken-order.component.html',
  styleUrls: ['./driver-taken-order.component.css']
})
export class DriverTakenOrderComponent {
  @Input() orderId: string = '';
  @Output() orderConfirmed = new EventEmitter<string>();

  onOrderConfirmed(event: string) {
    console.log('Order confirmed:', event);
    this.orderConfirmed.emit(event);
  }

}
