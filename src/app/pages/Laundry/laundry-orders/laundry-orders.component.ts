import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/laundry/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-orders',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './laundry-orders.component.html',
  styleUrl: './laundry-orders.component.css'
})
export class LaundryOrdersComponent {

}
