import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-whoareyou',
  templateUrl: './whoareyou.component.html',
  styleUrls: ['./whoareyou.component.css']
})
export class WhoAreYouComponentSign {
  @Input() action: 'login' | 'signup' = 'login'; // Default to login if not specified

  constructor(private router: Router, private route: ActivatedRoute) {
    // Read query param 'action' and set action property
    this.route.queryParams.subscribe(params => {
      if (params['action'] === 'signup' || params['action'] === 'login') {
        this.action = params['action'];
      }
    });
  }

  // Navigates the user to the login/signup page based on selected role and action prop
  // Stores the role in localStorage for later retrieval
  goTo(role: string) {
    console.log('Selected role:', role);
    console.log('Action input:', this.action);
    localStorage.setItem("Role", role); // Save the role (e.g., customer, laundry, admin, driver)

    // Navigate based on the action prop and role bcjh
    const routeSuffix = this.action === 'signup' ? '-signup' : '-login';
    const route = (() => {
      switch(role) {
        case 'customer':
          return `/cus-signup`;
        case 'laundry':
          return `/lun-signup`;
       
        default:
          console.error('Invalid role selected:', role);
          return null;
      }
    })();
    console.log('Navigating to route:', route);
    if (route) {
      this.router.navigate([route]);
    }
  }

  // Alternative role selection method using query parameters
  // This allows passing both the role and action through the URL
  selectRole(role: string) {
    const baseRoute = this.action === 'signup' ? '/signup' : '/login';
    this.router.navigate([baseRoute], { 
      queryParams: { 
        role: role,
        action: this.action 
      } 
    });
  }

  // Method to get the current action for display purposes
  getCurrentAction(): string {
    return this.action === 'signup' ? 'Sign Up' : 'Login';
  }

  // Method to get the opposite action for potential toggle functionality
  getOppositeAction(): 'login' | 'signup' {
    return this.action === 'signup' ? 'login' : 'signup';
  }
}