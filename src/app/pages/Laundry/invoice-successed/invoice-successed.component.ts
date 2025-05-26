import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from '../../../components/laundry/success-message/success-message.component';


@Component({
  selector: 'app-invoice-successed',
  standalone: true,
  imports: [CommonModule, SuccessMessageComponent],
  templateUrl: './invoice-successed.component.html',
  styleUrl: './invoice-successed.component.css'
})
export class InvoiceSuccessedComponent {

}
