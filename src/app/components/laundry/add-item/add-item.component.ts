import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/data.services';
import { ItemService } from '../../../services/item.service';
import { ServiceWithPrice } from '@app/models/item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html'
})
export class AddItemComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<void>();
  
  categories: string[] = ['Ladies', 'Gents', 'Kids', 'Other'];
  availableServices: string[] = ['Regular Wash', 'Dry Clean', 'Press Only','Hand Wash'];

  imageUrl: string = '';
  itemName: string = '';
  description: string = '';
  selectedCategory: string = '';
  categoryId: string = '';
  services: ServiceWithPrice[] = [];
  isImageUploading: boolean = false;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // --- Material Types State ---
  materialInput: string = '';
  materials: string[] = [];
  materialServices: { [material: string]: ServiceWithPrice[] } = {};

  // --- Custom Dropdown State ---
  isCategoryDropdownOpen: boolean = false;
  
  // --- Loading States ---
  isAddingMaterial: boolean = false;

  constructor(
    private dataService: DataService, 
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
      this.onCategoryChange();
    }
    
    this.addService();
  }

  // Method to toggle category dropdown
  toggleCategoryDropdown(): void {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  // Method to select category
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.isCategoryDropdownOpen = false;
    this.onCategoryChange();
  }

  // Method to get selected category display text
  getSelectedCategoryText(): string {
    return this.selectedCategory || 'Select Category';
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.dataService.getCategoryIdByName(this.selectedCategory)
        .subscribe({
          next: (response) => {
            this.categoryId = response.categoryId;
          },
          error: (error) => {
            console.error('Error fetching category ID:', error);
            alert('Error fetching category ID. Please try again.');
          }
        });
    }
  }

  onServiceChange(index: number) {
    const service = this.services[index];
    if (service.serviceName) {
      this.dataService.getServiceIdByName(service.serviceName)
        .subscribe({
          next: (response) => {
            this.services[index].serviceId = response.serviceId;
          },
          error: (error) => {
            console.error('Error fetching service ID:', error);
            alert('Error fetching service ID. Please try again.');
          }
        });
    }
  }

  addService() {
    if (this.services.length < 3) {
      this.services.push({
        serviceId: '',
        serviceName: this.availableServices.length > 0 ? this.availableServices[0] : '',
        price: null,
      });
      if (this.services.length > 0) {
        this.onServiceChange(this.services.length - 1);
      }
    }
  }

  removeService(index: number) {
    this.services.splice(index, 1);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.isImageUploading = true;
      
      this.dataService.uploadImage(file).subscribe({
        next: (response) => {
          this.imageUrl = response.imageUrl;
          this.isImageUploading = false;
          console.log('Image uploaded successfully:', response.message);
          console.log('Image URL:', response.imageUrl);
        },
        error: (error) => {
          this.isImageUploading = false;
          console.error('Error uploading image:', error);
          alert('Error uploading image. Please try again.');
        }
      });
    }
  }

  // Add a material (always lowercase, no duplicates, non-empty)
  addMaterial() {
    const mat = this.materialInput.trim().toLowerCase();
    if (!mat || this.materials.includes(mat)) {
      this.materialInput = '';
      return;
    }
    
    // Set loading state
    this.isAddingMaterial = true;
    
    // The backend will automatically create the garment type if it doesn't exist
    this.dataService.getGarmentTypeIdByName(mat).subscribe({
      next: (response) => {
        console.log('Garment type response:', response);
        
        if (response.garmentTypeId && typeof response.garmentTypeId === 'string') {
          // Add to UI if we got a valid garment type ID
          this.materials.push(mat);
          this.materialServices[mat] = this.availableServices.map(s => ({
            serviceId: '',
            serviceName: s,
            price: null
          }));
          
          // Show success message if garment type was created
          if (response.message) {
            console.log('Success:', response.message);
          }
        } else {
          // Show error message if garment type creation failed
          if (response.message) {
            alert(`Failed to create garment type: ${response.message}`);
          } else {
            alert('Failed to create garment type. Please try again.');
          }
        }
        this.materialInput = '';
        this.isAddingMaterial = false;
      },
      error: (error) => {
        console.error('Error creating garment type:', error);
        alert('Error creating garment type. Please try again.');
        this.materialInput = '';
        this.isAddingMaterial = false;
      }
    });
  }

  // Remove a material
  removeMaterial(mat: string) {
    this.materials = this.materials.filter(m => m !== mat);
    delete this.materialServices[mat];
  }

  // Remove a service from a material
  removeMaterialService(mat: string, idx: number) {
    if (this.materialServices[mat]) {
      this.materialServices[mat].splice(idx, 1);
    }
  }

  // Update price for a service of a material
  updateMaterialServicePrice(mat: string, idx: number, price: number) {
    this.materialServices[mat][idx].price = price;
  }

  // Update service name for a material (if needed)
  updateMaterialServiceName(mat: string, idx: number, name: string) {
    this.materialServices[mat][idx].serviceName = name;
  }

  // Check if form meets minimum requirements
  hasMinimumRequirements(): boolean {
    // Check if all required fields are filled
    if (!this.itemName || !this.categoryId || !this.imageUrl) {
      return false;
    }
    
    // Check if at least one material is added
    if (this.materials.length === 0) {
      return false;
    }
    
    // Check if at least one material has at least one service with price
    for (const material of this.materials) {
      const services = this.materialServices[material];
      if (services && services.length > 0) {
        for (const service of services) {
          if (service.serviceName && service.price && service.price > 0) {
            return true; // Found at least one valid service
          }
        }
      }
    }
    
    return false; // No valid service found
  }

  onSubmit() {
    // Check minimum requirements
    if (!this.hasMinimumRequirements()) {
      this.errorMessage = 'Please fill all required fields (Item Name, Category, Image) and add at least one material with one service and price.';
      return;
    }

    if (this.isImageUploading) {
      this.errorMessage = 'Please wait for image upload to complete.';
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    // Get laundry ID from localStorage
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      this.errorMessage = 'Laundry ID not found. Please log in again.';
      this.isSubmitting = false;
      return;
    }

    // Step 1: Resolve garmentTypeId for each material (backend will auto-create if needed)
    const materialIdObservables = this.materials.map(mat =>
      this.dataService.getGarmentTypeIdByName(mat).pipe(
        map(res => {
          if (res && res.garmentTypeId && typeof res.garmentTypeId === 'string') {
            return { name: mat, garmentTypeId: res.garmentTypeId as string };
          } else {
            return { name: mat, garmentTypeId: null };
          }
        }),
        catchError(error => {
          console.error(`Error getting garment type ID for ${mat}:`, error);
          return of({ name: mat, garmentTypeId: null });
        })
      )
    );

    forkJoin(materialIdObservables).subscribe((materialResults: { name: string, garmentTypeId: string | null }[]) => {
      // Step 2: Build the payload with garmentTypeId for each garment type
      const garmentTypesWithNames = materialResults
        .filter(res => res.garmentTypeId !== null)
        .map(res => ({
          name: res.name,
          garmentTypeId: res.garmentTypeId as string,
          services: this.materialServices[res.name]
        }));

      // Prevent null garmentTypeId
      const invalidGarment = materialResults.find(g => !g.garmentTypeId);
      if (invalidGarment) {
        this.errorMessage = 'Failed to resolve garmentTypeId for one or more materials. Please check your input.';
        this.isSubmitting = false;
        return;
      }

      // Step 3: Resolve serviceId for each service in each garment type
      const serviceIdRequests: Observable<any>[] = [];
      garmentTypesWithNames.forEach(gt => {
        gt.services.forEach((service, idx) => {
          if (!service.serviceId) {
            serviceIdRequests.push(
              this.dataService.getServiceIdByName(service.serviceName!).pipe(
                map(res => ({
                  garmentTypeName: gt.name,
                  serviceIdx: idx,
                  serviceId: res.serviceId
                }))
              )
            );
          }
        });
      });

      forkJoin(serviceIdRequests.length ? serviceIdRequests : [of(null)]).subscribe(serviceIdResults => {
        // Fill in the resolved serviceIds
        if (serviceIdResults) {
          (serviceIdResults as any[]).forEach(res => {
            if (res && res.garmentTypeName && res.serviceIdx !== undefined) {
              const gt = garmentTypesWithNames.find(g => g.name === res.garmentTypeName);
              if (gt) {
                gt.services[res.serviceIdx].serviceId = res.serviceId;
              }
            }
          });
        }

        // Now build the final payload
        const garmentTypesPayload = garmentTypesWithNames.map(gt => ({
          garmentTypeId: gt.garmentTypeId,
          garmentTypeName: gt.name,
          services: gt.services.map(s => ({
            serviceId: s.serviceId,
            serviceName: s.serviceName,
            price: s.price ?? 0
          }))
        }));

        // Prevent empty serviceId
        const invalidService = garmentTypesPayload.some(gt => gt.services.some(s => !s.serviceId));
        if (invalidService) {
          alert('Failed to resolve serviceId for one or more services. Please check your input.');
          return;
        }

        const payload = {
          name: this.itemName,
          description: this.description,
          categoryId: this.categoryId,
          imageUrl: this.imageUrl,
          garmentTypes: garmentTypesPayload
        };

        console.log('Sending payload:', payload);
        this.itemService.addItem(payload).subscribe({
          next: () => {
            console.log('Item added successfully, setting success message');
            this.successMessage = 'Item added successfully!';
            console.log('Success message set:', this.successMessage);
            this.isSubmitting = false;
            setTimeout(() => {
              console.log('Clearing success message and navigating');
              this.successMessage = '';
              this.resetForm();
              this.itemAdded.emit(); // Emit event to refresh item grid
              this.router.navigate(['/laundry-items']);
            }, 3000);
          },
          error: err => {
            console.error('Full error:', err);
            alert('Error: ' + err.message);
            this.isSubmitting = false;
          },
        });
      });
    });
  }

  resetForm() {
    // Reset all form fields
    this.imageUrl = '';
    this.itemName = '';
    this.description = '';
    this.selectedCategory = this.categories[0];
    this.categoryId = '';
    this.services = [];
    this.isImageUploading = false;
    
    // Reset materials
    this.materials = [];
    this.materialServices = {};
    this.materialInput = '';
    
    // Reset category and add initial service
    this.onCategoryChange();
    this.addService();
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  goBackToItems() {
    this.router.navigate(['/laundry-items']);
  }
}
