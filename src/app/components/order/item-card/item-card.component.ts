import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Item, ServiceWithPrice } from '../../../models/item.model';
import { FabricTypeService } from '../../../services/fabric-type.service';
import { WashMethodService } from '../../../services/wash-method.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;

  selectedGarment = new FormControl('Cotton');
  selectedService = new FormControl('');
  selectedWashMethod = new FormControl('');
  quantity = new FormControl(1);
  
  fabricTypes: string[] = [];
  washMethods: string[] = [];
  currentPrice: number = 0;
  
  constructor(
    private fabricTypeService: FabricTypeService,
    private washMethodService: WashMethodService
  ) {}
  
  ngOnInit(): void {
    // Get fabric types from the service
    this.fabricTypes = this.fabricTypeService.getFabricTypes();
    
    // Get wash methods from the service
    this.washMethods = this.washMethodService.getWashMethods();
    
    // Set default values
    if (this.fabricTypes.length > 0) {
      this.selectedGarment.setValue(this.fabricTypes[0]);
    }
    
    if (this.washMethods.length > 0) {
      this.selectedWashMethod.setValue(this.washMethods[0]);
    }
    
    // Set default service if available
    if (this.item.services && this.item.services.length > 0) {
      this.selectedService.setValue(this.item.services[0].serviceId);
      this.updatePrice();
    }
    
    // Listen for service selection changes
    this.selectedService.valueChanges.subscribe(() => {
      this.updatePrice();
    });

    // Add this: Listen for quantity changes
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
  
  onAddToBasket(): void {
    console.log('Item:', this.item.itemName);
    console.log('Fabric Type:', this.selectedGarment.value);
    console.log('Service:', this.getSelectedServiceName());
    console.log('Wash Method:', this.selectedWashMethod.value);
    console.log('Price:', this.currentPrice);
    console.log('Quantity:', this.quantity.value);
    // Call your cart service to add item
  }
  
  getSelectedServiceName(): string {
    const selectedServiceId = this.selectedService.value;
    const service = this.item.services.find(s => s.serviceId === selectedServiceId);
    return service?.serviceName || 'Unknown Service';
  }
}