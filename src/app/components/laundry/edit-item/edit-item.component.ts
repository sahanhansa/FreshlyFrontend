import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { DataService } from '../../../services/data.services';
import { ServiceWithPrice } from '@app/models/item.model';
import { catchError } from 'rxjs/operators';

// Interface matching the API response
interface ItemResponse {
  itemId?: string;
  name?: string;
  itemName?: string;
  categoryName?: string;
  categoryId?: string;
  imageUrl?: string;
  description?: string;
  services: {
    serviceId: string;
    serviceName: string;
    price: number;
  }[];
}

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule ],
  templateUrl: './edit-item.component.html',
})
export class EditItemComponent implements OnInit {
  @Output() itemUpdated = new EventEmitter<void>();
  @Input() itemId: string = '';
  
  imageUrl: string = 'assets/default.png';
  loading: boolean = false;
  isSubmitting: boolean = false;
  successMessage: string = '';
  
  categories: { id: string; name: string }[] = [
    { id: 'dc9b80ab-6671-11f0-9664-0022481a06a0', name: 'Ladies' },
    { id: 'dc9b8643-6671-11f0-9664-0022481a06a0', name: 'Gents' },
    { id: 'dc9b879d-6671-11f0-9664-0022481a06a0', name: 'Kids' },
    { id: 'dc9b8811-6671-11f0-9664-0022481a06a0', name: 'Other' }
  ];
  availableServices: string[] = ['Regular Wash', 'Dry Clean', 'Press Only', 'Hand Wash'];

  // --- Garment Types State ---
  materials: string[] = [];
  materialServices: { [garmentTypeId: string]: ServiceWithPrice[] } = {};
  materialNames: { [garmentTypeId: string]: string } = {};
  newMaterialInput: string = '';
  newServiceInput: { [garmentTypeId: string]: string } = {};
  serviceIdLoading: { [garmentTypeId: string]: boolean[] } = {};

  // --- Custom Dropdown State ---
  isCategoryDropdownOpen: boolean = false;
  isServiceDropdownOpen: { [garmentTypeId: string]: boolean } = {};

  item = {
    name: '',
    description: '',
    categoryId: '',
    categoryName: '',
    services: [] as ServiceWithPrice[]
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private itemService: ItemService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    console.log('EditItemComponent ngOnInit - itemId:', this.itemId);
    if (this.itemId) {
      this.loadItem();
    } else {
      console.error('No itemId provided to EditItemComponent');
    }
  }

  // Method to toggle category dropdown
  toggleCategoryDropdown(): void {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  // Method to select category
  selectCategory(category: { id: string; name: string }): void {
    this.item.categoryId = category.id;
    this.item.categoryName = category.name;
    this.isCategoryDropdownOpen = false;
    this.onCategoryChange();
  }

  // Method to get selected category display text
  getSelectedCategoryText(): string {
    return this.item.categoryName || 'Select Category';
  }

  // Method to toggle service dropdown for a specific material
  toggleServiceDropdown(garmentTypeId: string): void {
    this.isServiceDropdownOpen[garmentTypeId] = !this.isServiceDropdownOpen[garmentTypeId];
  }

  // Method to select service for a specific material
  selectService(garmentTypeId: string, serviceName: string): void {
    this.addServiceToGarment(garmentTypeId, serviceName);
    this.isServiceDropdownOpen[garmentTypeId] = false;
  }

  // Method to get selected service display text for a specific material
  getSelectedServiceText(garmentTypeId: string): string {
    return 'Select service...';
  }

  loadItem() {
    console.log('Loading item with ID:', this.itemId);
    this.loading = true;
    this.itemService.getItemById(this.itemId).subscribe({
      next: (item: any) => {
        console.log('Raw item response:', item);
        if (!item) {
          console.error('No item data received');
          alert('No item data received. Please try again.');
          return;
        }
        this.item = {
          name: item.name || item.itemName || '',
          description: item.description || '',
          categoryId: item.categoryId || '',
          categoryName: '',
          services: [] // Not used with new garmentTypes structure
        };
        // Set categoryName based on loaded categoryId
        const foundCat = this.categories.find(cat => cat.id === this.item.categoryId);
        if (foundCat) this.item.categoryName = foundCat.name;
        this.imageUrl = item.imageUrl || 'assets/default.png';
        // Populate garment types state
        this.materials = [];
        this.materialServices = {};
        this.materialNames = {};
        if (item.garmentTypes && Array.isArray(item.garmentTypes)) {
          for (const gt of item.garmentTypes) {
            if (gt.garmentTypeId) {
              this.materials.push(gt.garmentTypeId);
              this.materialServices[gt.garmentTypeId] = (gt.services || []).map((s: any) => ({
                serviceId: s.serviceId,
                serviceName: s.serviceName,
                price: s.price
              }));
              this.materialNames[gt.garmentTypeId] = gt.garmentTypeName || gt.garmentTypeId;
            }
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading item:', error);
        alert('Error loading item. Please try again.');
        this.loading = false;
      }
    });
  }

  onServiceChange(index: number) {
    const service = this.item.services[index];
    if (service.serviceName) {
      this.dataService.getServiceIdByName(service.serviceName)
        .subscribe({
          next: (response) => {
            this.item.services[index].serviceId = response.serviceId;
          },
          error: (error) => {
            console.error('Error fetching service ID:', error);
            alert('Error fetching service ID. Please try again.');
          }
        });
    }
  }

  addService() {
    if (this.item.services.length < 3) {
      this.item.services.push({
        serviceId: '',
        serviceName: this.availableServices.length > 0 ? this.availableServices[0] : '',
        price: null
      });
      if (this.item.services.length > 0) {
        this.onServiceChange(this.item.services.length - 1);
      }
    }
  }

  removeService(index: number) {
    this.item.services.splice(index, 1);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.dataService.uploadImage(file).subscribe({
        next: (response) => {
          this.imageUrl = response.imageUrl;
          console.log('Image uploaded successfully:', response.message);
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          alert('Error uploading image. Please try again.');
        }
      });
    }
  }

  onRemoveItem() {
    // Navigate to delete confirmation page with item details
    this.router.navigate(['/laundry-delete-confirmation', this.itemId], {
      state: { 
        itemName: this.item.name || this.itemId,
        itemId: this.itemId 
      }
    });
  }

  onSubmit() {
    if (!this.item.name || !this.item.categoryId || this.materials.length === 0) {
      alert('Please fill all required fields and add at least one garment type.');
      return;
    }

    // Build garmentTypes array for the payload
    const garmentTypesPayload = this.materials.map(mat => ({
      garmentTypeId: mat,
      garmentTypeName: this.materialNames[mat],
      services: (this.materialServices[mat] || []).map(s => ({
        serviceId: s.serviceId,
        serviceName: s.serviceName,
        price: s.price ?? 0
      }))
    }));

    // Check if all services have serviceId
    for (const gt of garmentTypesPayload) {
      for (const service of gt.services) {
        if (!service.serviceId) {
          // Instead of alert, just return and rely on button disabling/loading indicator
          return;
        }
      }
    }

    this.isSubmitting = true;
    const payload = {
      name: this.item.name,
      description: this.item.description,
      categoryId: this.item.categoryId,
      imageUrl: this.imageUrl,
      garmentTypes: garmentTypesPayload
    };

    console.log('Updating item with payload:', payload);
    this.itemService.updateItem(this.itemId, payload).subscribe({
      next: () => {
        this.successMessage = 'Item updated successfully!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/laundry-items']);
        }, 1500);
        this.itemUpdated.emit(); // Emit event to notify parent
        this.isSubmitting = false;
      },
      error: err => {
        console.error('Full error:', err);
        alert('Error: ' + err.message);
        this.isSubmitting = false;
      },
    });
  }

  // Update categoryId when categoryName changes
  onCategoryChange() {
    const selected = this.categories.find(cat => cat.name === this.item.categoryName);
    this.item.categoryId = selected ? selected.id : '';
  }

  // Add a service to a garment type
  addServiceToGarment(garmentTypeId: string, serviceName: string) {
    if (!serviceName || this.materialServices[garmentTypeId]?.some(s => s.serviceName?.toLowerCase() === serviceName.toLowerCase())) {
      this.newServiceInput[garmentTypeId] = '';
      return;
    }
    if (!this.serviceIdLoading) this.serviceIdLoading = {};
    if (!this.serviceIdLoading[garmentTypeId]) this.serviceIdLoading[garmentTypeId] = [];
    const idx = this.materialServices[garmentTypeId]?.length || 0;
    this.serviceIdLoading[garmentTypeId][idx] = true;

    this.dataService.getServiceIdByName(serviceName).subscribe({
      next: (response) => {
        if (!this.materialServices[garmentTypeId]) this.materialServices[garmentTypeId] = [];
        this.materialServices[garmentTypeId].push({
          serviceId: response.serviceId,
          serviceName: serviceName,
          price: 0
        });
        this.serviceIdLoading[garmentTypeId][idx] = false;
        this.newServiceInput[garmentTypeId] = '';
      },
      error: () => {
        this.serviceIdLoading[garmentTypeId][idx] = false;
        this.newServiceInput[garmentTypeId] = '';
      }
    });
  }

  // Remove a service from a garment type
  removeServiceFromGarment(garmentTypeId: string, index: number) {
    if (this.materialServices[garmentTypeId]) {
      this.materialServices[garmentTypeId].splice(index, 1);
    }
  }

  addMaterial() {
    const matName = this.newMaterialInput.trim().toLowerCase();
    if (!matName || Object.values(this.materialNames).includes(matName)) {
      this.newMaterialInput = '';
      return;
    }
    this.dataService.getGarmentTypeIdByName(matName).pipe(
      catchError(() => this.dataService.addGarmentType(matName))
    ).subscribe({
      next: (res: any) => {
        const garmentTypeId = res.garmentTypeId;
        this.materials.push(garmentTypeId);
        this.materialNames[garmentTypeId] = matName;
        this.materialServices[garmentTypeId] = this.availableServices.map(s => ({
          serviceId: '',
          serviceName: s,
          price: 0
        }));
        this.newMaterialInput = '';
      }
    });
  }

  removeMaterial(mat: string) {
    this.materials = this.materials.filter(m => m !== mat);
    delete this.materialNames[mat];
    delete this.materialServices[mat];
  }

  getAvailableServicesForMaterial(mat: string): string[] {
    return this.availableServices.filter(
      svc => !(this.materialServices[mat]?.some(service => service.serviceName === svc))
    );
  }

  onAddService(mat: string, serviceSelect: HTMLSelectElement) {
    this.addServiceToGarment(mat, serviceSelect.value);
    serviceSelect.value = '';
  }

  isAnyServiceIdLoading(): boolean {
    return Object.values(this.serviceIdLoading).some(arr => arr && arr.some(loading => loading));
  }

  goBackToItems() {
    this.router.navigate(['/laundry-items']);
  }

}

