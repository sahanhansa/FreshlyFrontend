import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../../models/item.model';
import { FabricTypeService } from '../../../services/fabric-type.service';
import { BasketService } from '../../../services/basket.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

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
  
  laundryId: string = '';
  isAddingToBasket: boolean = false;
  addToBasketSuccess: boolean = false;
  addToBasketError: string = '';
  
  constructor(
    private fabricTypeService: FabricTypeService,
    private basketService: BasketService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}
  
  ngOnInit(): void {
    // Get the laundry ID from the route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.laundryId = id;
      }
    });
    
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

    // Check what properties are actually available
    console.log('Item data:', this.item);
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
  
  // Updated method to handle adding to basket without login requirement
  onAddToBasket(): void {
    // Reset status
    this.isAddingToBasket = true;
    this.addToBasketSuccess = false;
    this.addToBasketError = '';
    
    // Use a valid GUID format for anonymous users instead of a string with "anon-" prefix
    // This matches what the backend expects
    const customerId = "e9194d78-2e64-11f0-a04a-30d0423f455f"; // Anonymous user GUID
    
    if (!this.laundryId) {
      this.addToBasketError = 'No laundry selected';
      this.isAddingToBasket = false;
      this.toastService.show('Error', 'No laundry selected', 'error');
      return;
    }
    
    const itemId = this.item.itemId?.toString() || this.item.id?.toString() || '';
    const selectedServiceId = this.selectedService.value || '';
    const quantity = this.quantity.value || 1;
    
    if (!itemId || !selectedServiceId) {
      this.addToBasketError = 'Please select a service';
      this.isAddingToBasket = false;
      this.toastService.show('Error', 'Please select a service', 'error');
      return;
    }
    
    console.log('Adding to basket:', {
      customerId,
      laundryId: this.laundryId,
      itemId,
      serviceId: selectedServiceId,
      quantity
    });
    
    // Call the basket service
    this.basketService.addItemToBasket(
      customerId,
      this.laundryId,
      itemId,
      selectedServiceId,
      quantity
    ).subscribe({
      next: (response) => {
        this.isAddingToBasket = false;
        this.addToBasketSuccess = true;
        this.toastService.show(
          'Success', 
          `${this.item.itemName || this.item.name} added to basket`, 
          'success'
        );
      },
      error: (error) => {
        this.isAddingToBasket = false;
        this.addToBasketError = 'Failed to add item to basket';
        this.toastService.show('Error', 'Failed to add item to basket', 'error');
        console.error('Error details:', error);
        
        // Display more specific error if available
        if (error.error && typeof error.error === 'string') {
          this.addToBasketError = error.error;
        }
      }
    });
  }
  
  // Helper method to get service name from service ID
  getSelectedServiceName(): string {
    const selectedServiceId = this.selectedService.value;
    const service = this.item.services.find(s => s.serviceId === selectedServiceId);
    return service?.serviceName || 'Unknown Service';
  }
}