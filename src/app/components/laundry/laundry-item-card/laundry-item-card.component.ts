import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interface matching the API response
interface ItemResponse {
  itemId: string;
  itemName: string;
  categoryName: string;
  imageUrl: string;
  services: {
    serviceId: string;
    serviceName: string;
    price: number;
  }[];
}

@Component({
  selector: 'app-laundry-item-card',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './laundry-item-card.component.html'

})
export class LaundryItemCardComponent implements OnInit {
  @Input() item!: ItemResponse;
  
  isDropdownOpen: boolean = false;
  selectedServiceId: string = '';

  ngOnInit() {
    // Set default selected service to the first available service
    if (this.item.services && this.item.services.length > 0) {
      this.selectedServiceId = this.item.services[0].serviceId;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectService(serviceId: string): void {
    this.selectedServiceId = serviceId;
    this.isDropdownOpen = false;
  }

  getCurrentPrice(): number {
    const selectedService = this.item.services?.find(s => s.serviceId === this.selectedServiceId);
    return selectedService?.price || 0;
  }

  getSelectedServiceName(): string {
    const selectedService = this.item.services?.find(s => s.serviceId === this.selectedServiceId);
    return selectedService?.serviceName || 'Select Service';
  }

}
