import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-method-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-method-popup.component.html',
  styleUrls: ['./payment-method-popup.component.scss']
})
export class PaymentMethodPopupComponent {
  @Input() orderId: string = '';
  @Input() totalAmount: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() paymentSelected = new EventEmitter<{method: string, orderId: string}>();
  
  selectedPaymentMethod: string = 'cash'; // Default to cash

  onConfirm(): void {
    this.paymentSelected.emit({
      method: this.selectedPaymentMethod,
      orderId: this.orderId
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  get confirmButtonText(): string {
    return this.selectedPaymentMethod === 'cash' ? 'Done' : 'Next';
  }
}
