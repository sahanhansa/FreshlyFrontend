import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor() {}

  logout(): void {
    localStorage.clear();
    window.location.href = '/';
  }
  name: string = '';
  email: string = '';
  contactNumbers: string[] = [];
  address: string = '';

  ngOnInit(): void {
    // Load data from localStorage
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    this.name = firstName + (lastName ? ' ' + lastName : '');
    this.email = localStorage.getItem('email') || '';
    // Try to get contactNumbers array from localStorage
    const contactNumbersRaw = localStorage.getItem('contactNumbers');
    if (contactNumbersRaw) {
      try {
        const parsed = JSON.parse(contactNumbersRaw);
        if (Array.isArray(parsed)) {
          this.contactNumbers = parsed;
        } else if (typeof parsed === 'string') {
          this.contactNumbers = [parsed];
        } else {
          this.contactNumbers = [contactNumbersRaw];
        }
      } catch {
        this.contactNumbers = [contactNumbersRaw];
      }
    } else {
      // fallback to single contactNumber
      const contactNumber = localStorage.getItem('contactNumber');
      if (contactNumber) {
        this.contactNumbers = [contactNumber];
      }
    }
    const houseNo = localStorage.getItem('houseNo') || '';
    const street = localStorage.getItem('street') || '';
    const city = localStorage.getItem('city') || '';
    const postalCode = localStorage.getItem('postalCode') || '';
    this.address = `${houseNo} ${street}, ${city}, ${postalCode}`.trim();
  }

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
