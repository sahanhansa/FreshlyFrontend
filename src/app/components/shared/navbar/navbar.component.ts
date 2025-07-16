import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  currentPage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check current route on initialization
    this.detectUserType();
    
    // Subscribe to route changes to update navbar dynamically
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.detectUserType();
    });
  }

  private detectUserType(): void {
    const currentUrl = this.router.url;
    
    // Check localStorage for user-specific data
    const adminId = localStorage.getItem('adminId');
    const adminUsername = localStorage.getItem('adminUsername');
    const laundryId = localStorage.getItem('laundryId');
    const laundryName = localStorage.getItem('laundryName');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    // Determine user type based on localStorage and current route
    // Check URL first for driver detection since drivers and customers both use userId/username
    if (currentUrl.includes('/driver') || currentUrl.includes('driver-home')) {
      this.currentPage = 'driver';
      localStorage.setItem('currentPage', 'driver');
    } else if (adminId && adminUsername) {
      this.currentPage = 'admin';
      localStorage.setItem('currentPage', 'admin');
    } else if (laundryId && laundryName) {
      this.currentPage = 'laundry';
      localStorage.setItem('currentPage', 'laundry');
    } else if (userId && username) {
      // If we have userId/username but not in driver URL, it's a customer
      this.currentPage = 'customer';
      localStorage.setItem('currentPage', 'customer');
    } else {
      // Fallback: try to get from localStorage if already set
      this.currentPage = localStorage.getItem('currentPage');
    }
    
    console.log('Current URL:', currentUrl);
    console.log('Detected user type:', this.currentPage);
    console.log('LocalStorage keys:', {
      adminId: !!adminId,
      laundryId: !!laundryId,
      userId: !!userId,
      currentPage: localStorage.getItem('currentPage')
    });
  }
  
  // Toggle mobile menu state
menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}


}
