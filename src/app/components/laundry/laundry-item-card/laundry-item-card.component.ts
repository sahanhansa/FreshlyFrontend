import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { Inject, Injectable } from '@angular/core';

// Interface matching the API response
interface ItemResponse {
  itemId: string;
  itemName: string;
  categoryName: string;
  description?: string;
  imageUrl: string;
  services: {
    serviceId: string;
    serviceName: string;
    price: number;
  }[];
}

interface GarmentType {
  garmentTypeId: string;
  garmentTypeName: string;
}

@Component({
  selector: 'app-laundry-item-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './laundry-item-card.component.html'

})
export class LaundryItemCardComponent implements OnInit {
  @Input() item!: any;
  
  isDropdownOpen: boolean = false;
  isMaterialDropdownOpen: boolean = false;
  selectedServiceId: string = '';
  selectedGarmentTypeId: string = '';
  garmentTypes: GarmentType[] = [];
  services: any[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId || !this.item?.itemId) return;
    // Always fetch full item details to get garmentTypes
    this.itemService.getItemById(this.item.itemId).subscribe(fullItem => {
      this.item = { ...this.item, ...fullItem };
      if (this.item.garmentTypes && this.item.garmentTypes.length > 0) {
        this.garmentTypes = this.item.garmentTypes;
        this.selectedGarmentTypeId = this.garmentTypes[0].garmentTypeId;
        this.loadServicesForGarmentType(this.selectedGarmentTypeId);
      } else {
        // fallback: show all services if no garment types
        this.services = this.item.services || [];
        if (this.services.length > 0) {
          this.selectedServiceId = this.services[0].serviceId;
        }
      }
    });
  }

  loadServicesForGarmentType(garmentTypeId: string) {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) return;
    this.itemService.getItemsByLaundryIdAndGarmentId(laundryId, garmentTypeId).subscribe(items => {
      // Find the item with the same itemId
      const found = items.find((it: any) => it.itemId === this.item.itemId);
      if (found && found.services) {
        this.services = found.services;
        this.selectedServiceId = this.services.length > 0 ? this.services[0].serviceId : '';
      } else {
        this.services = [];
        this.selectedServiceId = '';
      }
    });
  }

  onGarmentTypeChange(garmentTypeId: string) {
    this.selectedGarmentTypeId = garmentTypeId;
    this.loadServicesForGarmentType(garmentTypeId);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    // Close material dropdown when service dropdown is opened
    if (this.isDropdownOpen) {
      this.isMaterialDropdownOpen = false;
    }
  }

  toggleMaterialDropdown(): void {
    this.isMaterialDropdownOpen = !this.isMaterialDropdownOpen;
    // Close service dropdown when material dropdown is opened
    if (this.isMaterialDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  selectService(serviceId: string): void {
    this.selectedServiceId = serviceId;
    this.isDropdownOpen = false;
  }

  selectGarmentType(garmentTypeId: string): void {
    this.selectedGarmentTypeId = garmentTypeId;
    this.isMaterialDropdownOpen = false;
    this.onGarmentTypeChange(garmentTypeId);
  }

  getCurrentPrice(): number {
    const selectedService = this.services?.find(s => s.serviceId === this.selectedServiceId);
    return selectedService?.price || 0;
  }

  getSelectedServiceName(): string {
    const selectedService = this.services?.find(s => s.serviceId === this.selectedServiceId);
    return selectedService?.serviceName || 'Select Service';
  }

  getSelectedGarmentTypeName(): string {
    const selectedGarmentType = this.garmentTypes?.find(gt => gt.garmentTypeId === this.selectedGarmentTypeId);
    return selectedGarmentType?.garmentTypeName || 'Select Material';
  }
}
