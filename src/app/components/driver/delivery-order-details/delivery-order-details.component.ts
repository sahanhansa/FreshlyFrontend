import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
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
export class DeliveryOrderDetailsComponent  {
  @Input() deliveryOrder: DeliveryOrder | null = null;
  @Output() noteChange = new EventEmitter<string>();

onNoteChange(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  const note = textarea.value;
  this.noteChange.emit(note);
  console.log('Note changed:', note);
}
}
