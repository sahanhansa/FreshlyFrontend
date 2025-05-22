import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/admin/shared/navbar/navbar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  host: {
    class: 'block min-h-screen'
  },
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'feature-laundry';
  searchTerm: string = '';  isAuthPage: boolean = false;
  isAdminPage: boolean = false;
  isCustomerPage: boolean = false;
  isLaundryPage: boolean = false;
  userRole: string | null = null;

  constructor(private router: Router) {}
  ngOnInit() {
    // Check current route on initialization
    this.checkRouteType(this.router.url);
    
    // Subscribe to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkRouteType(event.url);
    });
  }
    // Check the type of page based on URL and set appropriate flags
  private checkRouteType(url: string) {
    this.isAuthPage = url.includes('/login') || url.includes('/signup') || url.includes('/whoareyou');
    
    // All admin pages are now under the /admin path
    this.isAdminPage = url.includes('/admin');
    
    // Customer pages
    this.isCustomerPage = url.includes('/cus-home') || url.includes('/order') || url.includes('/how-it-works') || 
                         url.includes('/contact') || url.includes('/profile');
    
    // Laundry pages
    this.isLaundryPage = url.includes('/laundry-home') || url.includes('/laundry-orders') || url.includes('/laundry-profile');
    
    // Store the role for navbar to use
    if (this.isAdminPage) {
      localStorage.setItem('currentPage', 'admin');
    } else if (this.isCustomerPage) {
      localStorage.setItem('currentPage', 'customer');
    }
  }

  onSearchChanged(term: string) {
    this.searchTerm = term;
    console.log('Search term:', term);
  }
}