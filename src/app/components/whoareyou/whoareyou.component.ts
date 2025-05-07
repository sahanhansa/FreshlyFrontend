import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whoareyou',
  templateUrl: './whoareyou.component.html',
  styleUrls: ['./whoareyou.component.css']
})
export class WhoAreYouComponent {

  constructor(private router: Router) {}

  goTo(role: string) {
    localStorage.setItem("Role",role);
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
    }
  }
  selectRole(role: string) {
    // Store in route (via query parameter)
    this.router.navigate(['/login'], { queryParams: { role: role } });
}
}
