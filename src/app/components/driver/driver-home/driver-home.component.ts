import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-home',
  imports: [],
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.css'
})
export class DriverHomeComponent {
   customerName: string = '';

  constructor(private router: Router) {
    // Read the customer name from localStorage (set during login)
    const storedName = localStorage.getItem('username');
    this.customerName = storedName ? storedName : 'Customer';
  }

}
