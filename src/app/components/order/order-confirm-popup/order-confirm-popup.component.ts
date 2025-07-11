import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerAddress } from 'src/app/models/order-models/customerAddress.model';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-confirm-popup',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './order-confirm-popup.component.html',
  styleUrl: './order-confirm-popup.component.css'
})
export class OrderConfirmPopupComponent {
  @Input() pickupDateTime!: Date;
  @Input() address!: CustomerAddress;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
