import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PickupsService, PickupOrder } from '../../../services/driver/pickups.service';

@Component({
  selector: 'app-order-details-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./order-details-pending.component.html',
  styleUrls: ['./order-details-pending.component.css']
})
export class OrderDetailsPendingComponent  {

  @Output() driverId = new EventEmitter<string>();
  @Output() orderId = new EventEmitter<string>();
  @Output() refreshOrder = new EventEmitter<string>();
  @Output() noteChange = new EventEmitter<string>();
  @Input() pickupOrder: PickupOrder | null = null; // Input for order ID


  ngOnChanges(changes: SimpleChanges) {
  if (changes['pickupOrder']) {
    console.log('pickupOrder changed:', this.pickupOrder);
  }
}
onNoteChange(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  const note = textarea.value;
  this.noteChange.emit(note);
  console.log('Note changed:', note);
}

}
