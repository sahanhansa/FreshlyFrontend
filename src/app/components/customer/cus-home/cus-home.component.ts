import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LaundriesCardCustomerComponent} from './laundries-list.component'
import {ClothingListComponent} from './clothing-list.component';
import {ContactPromptComponent} from './contact-prompt.component';

@Component({
  selector: 'app-cus-home',
  templateUrl: './cus-home.component.html',
  styleUrls: ['./cus-home.component.css'], // Optional, if you're not using inline styles
  imports: [
    LaundriesCardCustomerComponent,
    ClothingListComponent,
    ContactPromptComponent

    // Import your laundries card component
  ]
})
export class CusHomeComponent {
  customerName: string = '';

  constructor(private router: Router) {
    // Read the customer name from localStorage (set during login)
    const storedName = localStorage.getItem('username');
    this.customerName = storedName ? storedName : 'Customer';
  }

  goToHowItWorks() {
    this.router.navigate(['/how-it-works']);
  }
}
