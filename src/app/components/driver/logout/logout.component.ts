import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  confirmLogout() {
    alert('Logging out...');
    // Add actual logout logic here
  }

  cancelLogout() {
    alert('Logout canceled');
    // Add logic to close the modal or return to the previous page
  }
}
