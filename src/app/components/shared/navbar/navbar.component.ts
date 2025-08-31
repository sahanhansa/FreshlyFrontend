
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
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
    
    // Determine user type based on current route and localStorage
    // Priority: URL pattern > current login session > fallback
    
    if (currentUrl.includes('/driver') || currentUrl.includes('driver-home')) {
      this.currentPage = 'driver';
      localStorage.setItem('currentPage', 'driver');
    } else if (currentUrl.includes('/laundry') || currentUrl.includes('laundry-home')) {
      // If URL contains laundry, prioritize laundry detection
      if (laundryId && laundryName) {
        this.currentPage = 'laundry';
        localStorage.setItem('currentPage', 'laundry');
      } else {
        // Clear any conflicting data and redirect to login
        this.clearConflictingData();
        this.currentPage = null;
      }
    } else if (currentUrl.includes('/admin') || currentUrl.includes('admin-home')) {
      // If URL contains admin, prioritize admin detection
      if (adminId && adminUsername) {
        this.currentPage = 'admin';
        localStorage.setItem('currentPage', 'admin');
      } else {
        this.clearConflictingData();
        this.currentPage = null;
      }
    } else if (currentUrl.includes('/cus-home') || currentUrl.includes('/order')) {
      // Customer routes
      if (userId && username) {
        this.currentPage = 'customer';
        localStorage.setItem('currentPage', 'customer');
      } else {
        this.clearConflictingData();
        this.currentPage = null;
      }
    } else {
      // Fallback: check localStorage for current session
      if (laundryId && laundryName) {
        this.currentPage = 'laundry';
        localStorage.setItem('currentPage', 'laundry');
      } else if (adminId && adminUsername) {
        this.currentPage = 'admin';
        localStorage.setItem('currentPage', 'admin');
      } else if (userId && username) {
        this.currentPage = 'customer';
        localStorage.setItem('currentPage', 'customer');
      } else {
        this.currentPage = localStorage.getItem('currentPage');
      }
    }
    
    console.log('Current URL:', currentUrl);
    console.log('Detected user type:', this.currentPage);
    console.log('LocalStorage keys:', {
      adminId: !!adminId,
      adminUsername: !!adminUsername,
      laundryId: !!laundryId,
      laundryName: !!laundryName,
      userId: !!userId,
      username: !!username,
      currentPage: localStorage.getItem('currentPage')
    });
  }

  private clearConflictingData(): void {
    // Clear data from other user types to prevent conflicts
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('laundryId');
    localStorage.removeItem('laundryName');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
  
  // Toggle mobile menu state
menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}


}
