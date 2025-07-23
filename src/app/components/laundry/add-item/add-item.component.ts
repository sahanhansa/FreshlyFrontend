import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/data.services';
import { ItemService } from '../../../services/item.service';
import { ServiceWithPrice } from '@app/models/item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html'
})
export class AddItemComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<void>();
  
  categories: string[] = ['ladies', 'gents', 'kids', 'other'];
  availableServices: string[] = ['Regular Wash', 'Dry Clean', 'Press Only','Hand Wash'];

  imageUrl: string = '';
  itemName: string = '';
  description: string = '';
  selectedCategory: string = '';
  categoryId: string = '';
  services: ServiceWithPrice[] = [];
  isImageUploading: boolean = false;
  isSubmitting: boolean = false;

  // --- Material Types State ---
  materialInput: string = '';
  materials: string[] = [];
  materialServices: { [material: string]: ServiceWithPrice[] } = {};

  constructor(
    private dataService: DataService, 
    private itemService: ItemService
  ) {}

  ngOnInit() {
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
      this.onCategoryChange();
    }
    
    this.addService();
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
    // Check if garmentType exists in DB, if not, create it, then add to UI
    this.dataService.getGarmentTypeIdByName(mat).pipe(
      catchError(() => this.dataService.addGarmentType(mat)),
      switchMap(res => {
        if (res && res.garmentTypeId) {
          // Only add to UI if DB operation is successful
    this.materials.push(mat);
    this.materialServices[mat] = this.availableServices.map(s => ({
      serviceId: '',
      serviceName: s,
      price: null
    }));
        }
    this.materialInput = '';
        return of(null);
      })
    ).subscribe();
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

  onSubmit() {
    if (!this.itemName || !this.categoryId || this.services.length === 0) {
      alert('Please fill all required fields and add at least one service.');
      return;
    }

    if (this.isImageUploading) {
      alert('Please wait for image upload to complete.');
      return;
    }

    for (const service of this.services) {
      if (!service.serviceId) {
        alert('Please wait for service IDs to be loaded or try again.');
        return;
      }
    }

    this.isSubmitting = true;
    // Step 1: Resolve garmentTypeId for each material
    const materialIdObservables = this.materials.map(mat =>
      this.dataService.getGarmentTypeIdByName(mat).pipe(
        catchError(() =>
          this.dataService.addGarmentType(mat)
        ),
        switchMap(res => {
          if (res && res.garmentTypeId) {
            return of({ name: mat, garmentTypeId: res.garmentTypeId });
          } else {
            return of({ name: mat, garmentTypeId: null });
          }
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
        alert('Failed to resolve garmentTypeId for one or more materials. Please check your input.');
        return;
      }

      // Step 3: Resolve serviceId for each service in each garment type
      const serviceIdRequests: Observable<any>[] = [];
      garmentTypesWithNames.forEach(gt => {
        gt.services.forEach((service, idx) => {
          if (!service.serviceId) {
            serviceIdRequests.push(
              this.dataService.getServiceIdByName(service.serviceName!).pipe(
                // Attach context for where to put the result
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
          garmentTypeName: gt.name, // <-- Add this line to match backend expectation
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
            alert('Item added successfully!');
            this.resetForm();
            this.itemAdded.emit(); // Emit event to refresh item grid
            this.isSubmitting = false;
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
    
    // Reset category and add initial service
    this.onCategoryChange();
    this.addService();
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
