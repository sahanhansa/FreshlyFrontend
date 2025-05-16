import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-pickup-order-card',
  templateUrl: './pickup-order-card.component.html',
  imports: [RouterLink],
  styleUrls: ['./pickup-order-card.component.css']
})
export class PickupOrderCardComponent {




  @Input() orderId!: string;
  @Input() status!: string;
  @Input() customerName!: string;
  @Input() customerId!: string;
  @Input() address!: string;
  @Input() laundryName!: string;
}
