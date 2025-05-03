import { Component } from '@angular/core';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { SuccessMessageComponent } from '../../../components/laundry/success-message/success-message.component';


@Component({
  selector: 'app-invoice-successed',
  imports: [FooterComponent, SuccessMessageComponent ],
  templateUrl: './invoice-successed.component.html',
  styleUrl: './invoice-successed.component.css'
})
export class InvoiceSuccessedComponent {

}
