import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-laundry-item-card',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './laundry-item-card.component.html',
  styleUrls: ['./laundry-item-card.component.scss']
})
export class LaundryItemCardComponent {
  isDropdownOpen: boolean = false;

  // Hardcoded item data
  imageUrl: string = 'assets/shirt.jpg';
  name: string = 'Shirt';
  materials: string[] = ['Cotton', 'Linen'];
  selectedServiceId: string = 'wash';

  availableServices = [
    { id: 'wash', name: 'Regular Wash', price: 100 },
    { id: 'dry', name: 'Dry Clean', price: 150 },
    { id: 'press', name: 'Press Only', price: 70 }
  ];

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectService(serviceId: string): void {
    this.selectedServiceId = serviceId;
    this.isDropdownOpen = false;
  }

  getCurrentPrice(): number {
    const selectedService = this.availableServices.find(s => s.id === this.selectedServiceId);
    return selectedService?.price || 0;
  }

  getSelectedServiceName(): string {
    const selectedService = this.availableServices.find(s => s.id === this.selectedServiceId);
    return selectedService?.name || 'Select Service';
  }

}
