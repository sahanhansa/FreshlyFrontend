import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { RejectedItemService } from '../../../services/rejected-item.service';
import { RejectedItem } from '../../../models/rejected-item.model';


@Component({
  selector: 'app-to-pay-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-pay-order-card.component.html',
  styleUrl: './to-pay-order-card.component.css'
})
export class ToPayOrderCardComponent implements OnInit {
  @Input() orderId: string = '';
  @Input() laundryName: string = '';
  @Input() date: string = '';
  @Input() totalAmount: number = 0;
  @Input() items: { name: string, quantity: number }[] = [];
  
  @Output() payNow = new EventEmitter<string>();
  
  showLaundryNote = false;
  rejectedItems: RejectedItem[] = [];

  constructor(private rejectedItemService: RejectedItemService) {}

  // ngOnInit(): void {
  //   if (this.orderId) {
  //     this.rejectedItemService.getRejectedItemsByOrderId(this.orderId).subscribe({
  //       next: (items) => this.rejectedItems = items,
  //       error: (err) => console.error('Failed to load rejected items', err),
  //     });
  //   }
  // }

  ngOnInit(): void {
    if (this.orderId) {
      this.rejectedItemService.getRejectedItemsByOrderId(this.orderId).subscribe({
        next: (res) => {
          this.rejectedItems = res;
          console.log('Rejected items:', this.rejectedItems);
        },
        error: (err) => {
          console.error('Failed to load rejected items', err);
        }
      });
    } else {
      console.warn('Order ID is missing');
    }
  }


  onPayClick(): void {
    this.payNow.emit(this.orderId);
  }
  
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}
