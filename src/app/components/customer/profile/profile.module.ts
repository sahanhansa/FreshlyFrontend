import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';
  @Input() address: string = '';

  onViewCurrentOrders(): void {
    // Handle current orders view
    console.log('Viewing current orders for:', this.name);
  }

  onViewOrderHistory(): void {
    // Handle order history view
    console.log('Viewing order history for:', this.name);
  }

  onEditProfile(): void {
    // Handle profile editing
    console.log('Editing profile for:', this.name);
  }
}