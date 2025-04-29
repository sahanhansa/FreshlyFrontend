import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports:[RouterModule,CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tabs: { label: string, path: string }[] = [];
  isMobileMenuOpen = false; 

  ngOnInit() {
    const userType = localStorage.getItem('user_type');
    this.setTabsForRole(userType);
  }

  setTabsForRole(role: string | null) {
    if (!role) {
      this.tabs = []; // if not logged in
      return;
    }

    switch (role) {
      case 'customer':
        this.tabs = [
          { label: 'Home', path: '/home' },
          { label: 'How It Works', path: '/home' },
          { label: 'Order', path: '/orders' },
          { label: 'Contact Us', path: '/orders' },
          { label: 'Profile', path: '/orders' }
        ];
        break;
      case 'laundry':
        this.tabs = [
          { label: 'Home', path: '/home' },
          { label: 'Orders', path: '/home' },
          { label: 'Items', path: '/home' },
          { label: 'Feedbacks', path: '/home' },
          { label: 'Summary', path: '/home' },
          { label: 'Profile', path: '/home' } 
        ];
        break;
     case 'admin':
        this.tabs = [
          { label: 'Home', path: '/home' },
          { label: 'Drivers', path: '/home' },
          { label: 'Customers', path: '/home' },
          { label: 'Laundries', path: '/home' },
          { label: 'Orders', path: '/home' },
          { label: 'Vehicles', path: '/home' },
          { label: 'Complaints', path: '/home' },
          { label: 'Reports', path: '/home' }
        ];
        break;
      case 'driver':
        this.tabs = [
          { label: 'Home', path: '/home' },
          { label: 'Pickups', path: '/home' },
          { label: 'Deliveries', path: '/home' },
          { label: 'Contact Us', path: '/home' },
          { label: 'Profile', path: '/home' }
        ];
        break;
      default:
        this.tabs = []; 
    }
  }
}
