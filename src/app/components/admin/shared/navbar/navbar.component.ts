import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  tabs: { label: string, path: string }[] = [];
  logoUrl: string = "assets/images/freshly-logo.png";

  ngOnInit() {
    this.initializeTabs();
  }

  private initializeTabs() {
    this.tabs = [
      { label: 'Home', path: '/admin' },
      { label: 'Drivers', path: '/drivers' },
      { label: 'Customers', path: '/customers' },
      { label: 'Laundries', path: '/laundries' },
      { label: 'Orders', path: '/orders' },
      { label: 'Vehicles', path: '/vehicles' },
      { label: 'Complaints', path: '/complaints' },
      { label: 'Reports', path: '/reports' }
    ];
  }
}
