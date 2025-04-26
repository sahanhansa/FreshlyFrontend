// invoice-success.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './success-message.component.html'
})
export class SuccessMessageComponent {
 
  @Input() title: string = 'Sent Invoice Successfully';
  @Input() message: string = 'Invoice successfully sent to the customer.Please ensure all order details are accurate and monitor the payment status for further updates.';
  @Input() buttonText: string = 'Done';

  
  


}