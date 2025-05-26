import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../../models/item.model';
import { FabricTypeService } from '../../../services/fabric-type.service';

// Interface to support legacy properties
interface ExtendedItem extends Item {
  name?: string;
  price?: number;
  category?: string;
  id?: string | number;
}

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  // Input property to receive item data from parent component
  @Input() item!: ExtendedItem; 

  // Form controls for each selectable field
  selectedGarment = new FormControl('Cotton');
  selectedService = new FormControl('');
  selectedWashMethod = new FormControl('');
  quantity = new FormControl(1);
  
  // Array to store available fabric types
  fabricTypes: string[] = []; 
  // Store the calculated price based on service and quantity
  currentPrice: number = 0;
  
  // Inject FabricTypeService to get available fabric types
  constructor(
    private fabricTypeService: FabricTypeService
  ) {}
  
  ngOnInit(): void {
    // Get fabric types from the service
    this.fabricTypes = this.fabricTypeService.getFabricTypes();
    
    // Set default values
    if (this.fabricTypes.length > 0) {
      this.selectedGarment.setValue(this.fabricTypes[0]);
    }
    
    // Set default service if the item has services
    if (this.item.services && this.item.services.length > 0) {
      this.selectedService.setValue(this.item.services[0].serviceId);
      this.updatePrice();
    }
    
    // Listen for service selection changes to update price
    this.selectedService.valueChanges.subscribe(() => {
      this.updatePrice();
    });

    // Listen for quantity changes to update price
    this.quantity.valueChanges.subscribe(() => {
      this.updatePrice();
    });
  }
  
  // Update the price based on selected service
  updatePrice(): void {
    const selectedServiceId = this.selectedService.value;
    const selectedServiceObj = this.item.services.find(s => s.serviceId === selectedServiceId);
    const basePrice = selectedServiceObj?.price || 0;
    const qty = this.quantity.value || 1; // Default to 1 if null
    
    // Calculate total price based on quantity
    this.currentPrice = basePrice * qty;
  }
  
  // Handles the "Add to Basket" button click
  onAddToBasket(): void {
    console.log('Item:', this.item.itemName);
    console.log('Fabric Type:', this.selectedGarment.value);
    console.log('Service:', this.getSelectedServiceName());
    console.log('Wash Method:', this.selectedWashMethod.value);
    console.log('Price:', this.currentPrice);
    console.log('Quantity:', this.quantity.value);
    // TODO:Call your basket service to add item
  }
  
  // Helper method to get service name from service ID
  getSelectedServiceName(): string {
    const selectedServiceId = this.selectedService.value;
    const service = this.item.services.find(s => s.serviceId === selectedServiceId);
    return service?.serviceName || 'Unknown Service';
  }
}