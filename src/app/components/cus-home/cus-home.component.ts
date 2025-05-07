import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-cus-home',
  templateUrl: './cus-home.component.html',
  styleUrls: ['./cus-home.component.css'], // Optional, if you're not using inline styles
  imports: [HeaderComponent]
})
export class CusHomeComponent {
  customerName: string = 'Customer Name'; // You can fetch this dynamically from a service later
}
