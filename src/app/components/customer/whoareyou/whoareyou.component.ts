import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-whoareyou', 
  templateUrl: './whoareyou.component.html',
  styleUrls: ['./whoareyou.component.css']  
})
export class WhoAreYouComponent {

  constructor(private router: Router) {}

 //Navigates the user to the login page based on selected role.Stores the role in localStorage for later retrieval.
   goTo(role: string) {
    localStorage.setItem("Role", role); // Save the role (e.g., customer, laundry, admin)

    // Navigate to the login page (same route for all roles in this version)
    switch(role) {
      case 'customer':
        this.router.navigate(['/login']);
        break;
      case 'laundry':
        this.router.navigate(['/login']);
        break;
      case 'admin':
        this.router.navigate(['/login']);
        break;
        case 'driver':
          this.router.navigate(['/driver-home-page']);
    }
  }

  //Alternative role selection method using query parameters.This allows passing the role through the URL instead of localStorage.
  selectRole(role: string) {
    this.router.navigate(['/login'], { queryParams: { role: role } });
  }
}