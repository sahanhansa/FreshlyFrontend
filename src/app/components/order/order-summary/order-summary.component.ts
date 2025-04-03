import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  orderItems = [
    {
      name: 'T-shirt',
      details: 'Cotton, Wash and Dry',
      price: 250,
      quantity: 3,
      image: './assets/tshirt.png'
    },
    {
      name: 'Frock',
      details: 'Linen, Dry clean',
      price: 600,
      quantity: 1,
      image: './assets/frock.png'
    },
    {
      name: 'Trouser',
      details: 'Cotton, Wash and Dry',
      price: 400,
      quantity: 2,
      image: './assets/trousers.png'
    },
    {
      name: 'Jacket',
      details: 'Polyester, Iron only',
      price: 300,
      quantity: 1,
      image: './assets/jacket.png'
    }
  ];
}
