import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-backto-pickups-button',
  imports: [RouterLink],
  templateUrl: './backto-pickups-button.component.html',
  styleUrl: './backto-pickups-button.component.css'
})
export class BacktoPickupsButtonComponent {
  goBack() {
    console.log('Back to Pickups clicked');
    // Add navigation logic if needed
  }
}
