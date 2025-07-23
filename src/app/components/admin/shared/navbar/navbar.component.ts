import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() isAdminPage: boolean = false;
  @Input() isCustomerPage: boolean = false;
  @Input() isLaundryPage: boolean = false;
  
  tabs: { label: string, path: string }[] = [];
  logoUrl: string = "assets/images/freshly-logo.png";

  ngOnInit() {
    this.initializeTabs();
  }
    ngOnChanges(changes: SimpleChanges) {
    // Re-initialize tabs when inputs change
    if (changes['isAdminPage'] || changes['isCustomerPage'] || changes['isLaundryPage']) {
      this.initializeTabs();
    }
  }
  private initializeTabs() {
    if (this.isAdminPage) {
      this.tabs = [
        { label: 'Home', path: '/admin/dashboard' },
        { label: 'Drivers', path: '/admin/drivers' },
        { label: 'Customers', path: '/admin/customers' },
        { label: 'Laundries', path: '/admin/laundries' },
        { label: 'Orders', path: '/admin/orders' },
        { label: 'Vehicles', path: '/admin/vehicles' },
        { label: 'Complaints', path: '/admin/complaints' },
        { label: 'Reports', path: '/admin/reports' }
      ];    } else if (this.isCustomerPage) {
      this.tabs = [
        { label: 'Home', path: '/cus-home' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'Order', path: '/order' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Profile', path: '/profile' }
      ];
    } else if (this.isLaundryPage) {
      this.tabs = [
        { label: 'Home', path: '/laundry-home' },
        { label: 'Orders', path: '/laundry-orders' },
        { label: 'Profile', path: '/laundry-profile' },
        { label: 'Analytics', path: '/laundry-analytics' },
        { label: 'Settings', path: '/laundry-settings' }
      ];
    } else {
      // Default empty tabs if not on a specific page type
      this.tabs = [];
    }
  }
}
