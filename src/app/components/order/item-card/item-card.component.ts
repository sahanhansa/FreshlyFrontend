import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../../models/item.model';
import { FabricTypeService } from '../../../services/fabric-type.service';
import { BasketService } from '../../../services/basket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';
import { ItemService } from '@app/services/item.service';

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

    // Array to store available fabric types
  fabricTypes: { garmentTypeId: string; garmentTypeName: string }[] = []; 
  serviceTypes: { serviceId: string; serviceName: string}[] = [];

  // Form controls for each selectable field
  selectedGarment = new FormControl();
  selectedService = new FormControl();
  selectedWashMethod = new FormControl('');
  quantity = new FormControl(1);
  
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
    private router: Router,
    private toastService: ToastService,
    private userService: UserService,
    private itemService: ItemService
  ) {}
  
  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.laundryId = id;
    }
  });

  // Populate fabric types from item.services
  this.fabricTypes = this.getFabricTypes(this.item.services);

  if (this.fabricTypes.length > 0) {
    const defaultGarmentId = this.fabricTypes[0].garmentTypeId;
    this.selectedGarment.setValue(defaultGarmentId);

    // Manually trigger onGarmentChange to populate serviceTypes first
    this.onGarmentChange(defaultGarmentId, true); // true = indicate it's from init
  }

  // Watchers
  this.selectedGarment.valueChanges.subscribe((value) => {
    this.onGarmentChange(value);
  });

  this.selectedService.valueChanges.subscribe(() => {
    this.updatePrice();
  });

  this.quantity.valueChanges.subscribe(() => {
    this.updatePrice();
  });

  console.log('Item data:', this.item);
}


onGarmentChange(garmentId: any, fromInit = false): void {
  this.itemService.getItemsByLaundryIdAndGarmentId(this.laundryId, garmentId).subscribe({
    next: (res: any) => {
      if (!res || res.length === 0) return;

      this.serviceTypes = [];

      res[0].services.forEach((service: any) => {
        this.serviceTypes.push({
          serviceId: service.serviceId,
          serviceName: service.serviceName
        });
      });

      // If this was triggered from ngOnInit, set first service and update price
      if (fromInit && this.serviceTypes.length > 0) {
        const defaultServiceId = this.serviceTypes[0].serviceId;
        this.selectedService.setValue(defaultServiceId);
        this.updatePrice(); // now fabricType, serviceType and quantity are all available
      }
    },
    error: (err: any) => {
      console.error(err);
    }
  });
}




 getFabricTypes(data: any) {
  const uniqueMap = new Map();

  data.forEach((item: any) => {
    if (!uniqueMap.has(item.garmentTypeId)) {
      uniqueMap.set(item.garmentTypeId, {
        garmentTypeId: item.garmentTypeId,
        garmentTypeName: item.garmentTypeName
      });
    }
  });

  return Array.from(uniqueMap.values());
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
  this.isAddingToBasket = true;
  this.addToBasketSuccess = false;
  this.addToBasketError = '';

  const customerId = this.basketService.getCustomerId();
  if (!customerId) {
    this.isAddingToBasket = false;
    this.toastService.show('Error', 'Please log in to add items to basket', 'error');
    this.router.navigate(['/cus-login'], { queryParams: { returnUrl: this.router.url } });
    return;
  }

  if (!this.laundryId) {
    this.addToBasketError = 'No laundry selected';
    this.isAddingToBasket = false;
    this.toastService.show('Error', 'No laundry selected', 'error');
    return;
  }

  const itemId = this.item.itemId?.toString() || this.item.id?.toString() || '';
  const selectedServiceId = this.selectedService.value || '';
  const selectedGarmentId = this.selectedGarment.value || '';
  const quantity = this.quantity.value || 1;

  if (!itemId || !selectedServiceId || !selectedGarmentId) {
    this.addToBasketError = 'Please select all options';
    this.isAddingToBasket = false;
    this.toastService.show('Error', 'Please select fabric type and service', 'error');
    return;
  }

  this.basketService.addItemToBasket(
    this.laundryId,
    itemId,
    selectedServiceId,
    quantity,
    selectedGarmentId
  ).subscribe({
    next: (response) => {
      this.isAddingToBasket = false;
      this.addToBasketSuccess = true;
      this.toastService.show('Success', 'Item added to basket', 'success');
      setTimeout(() => {
        this.addToBasketSuccess = false;
      }, 3000);
    },
    error: (error) => {
      this.isAddingToBasket = false;
      this.addToBasketError = 'Failed to add to basket';
      console.error('Add to basket error:', error);
      this.toastService.show('Error', 'Failed to add to basket', 'error');
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