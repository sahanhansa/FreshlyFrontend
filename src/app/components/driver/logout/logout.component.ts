import { Component } from '@angular/core';
import { Router } from '@angular/router';  // ✅ Correct for Angular

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'] // ✅ should be style**s** not style
})
export class LogoutComponent {
  constructor(private router: Router) {}

  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/']); // Or wherever you want after logout
  }

  cancelLogout() {
    this.router.navigate(['/driver-profile-page']);
  }
}
