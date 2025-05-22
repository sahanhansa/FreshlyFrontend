import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cus-home',
  templateUrl: './cus-home.component.html',
  styleUrls: ['./cus-home.component.css'], // Optional, if you're not using inline styles
  imports: []
})
export class CusHomeComponent {
  customerName: string = 'Customer Name'; // You can fetch this dynamically from a service later
  
constructor(private router: Router) {}
 goToHowItWorks() {
  this.router.navigate(['/how-it-works']);
}

  
}
