import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { DataService } from '../../../services/data.services';
import { ServiceWithPrice } from '@app/models/item.model';

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
  
  imageUrl: string = 'assets/shirt.jpg';
  loading: boolean = false;
  isSubmitting: boolean = false;
  
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

  item = {
    name: '',
    description: '',
    categoryId: '',
    categoryName: '',
    services: [] as ServiceWithPrice[]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
        this.imageUrl = item.imageUrl || 'assets/shirt.jpg';
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
          alert('Please wait for service IDs to be loaded or try again.');
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
        alert('Item updated successfully!');
        this.itemUpdated.emit(); // Emit event to notify parent
        this.router.navigate(['/laundry-items']); // Navigate back to items page
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
    this.dataService.getServiceIdByName(serviceName).subscribe({
      next: (response) => {
        if (!this.materialServices[garmentTypeId]) {
          this.materialServices[garmentTypeId] = [];
        }
        this.materialServices[garmentTypeId].push({
          serviceId: response.serviceId,
          serviceName: serviceName,
          price: 0
        });
      },
      error: (error) => {
        alert('Failed to fetch service ID.');
      }
    });
  }

  // Remove a service from a garment type
  removeServiceFromGarment(garmentTypeId: string, index: number) {
    if (this.materialServices[garmentTypeId]) {
      this.materialServices[garmentTypeId].splice(index, 1);
    }
  }

}

