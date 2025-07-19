import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';
  @Input() address: string = '';

  @Output() viewCurrentOrders = new EventEmitter<void>();
  @Output() viewOrderHistory = new EventEmitter<void>();
  @Output() editProfile = new EventEmitter<void>();

  onViewCurrentOrders(): void {
    // Emit event to parent component
    this.viewCurrentOrders.emit();
    console.log('Viewing current orders for:', this.name);
  }

  onViewOrderHistory(): void {
    // Emit event to parent component
    this.viewOrderHistory.emit();
    console.log('Viewing order history for:', this.name);
  }

  onEditProfile(): void {
    // Emit event to parent component
    this.editProfile.emit();
    console.log('Editing profile for:', this.name);
  }
}
