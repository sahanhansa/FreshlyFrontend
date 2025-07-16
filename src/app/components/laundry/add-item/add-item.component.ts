import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.services';
import { ItemService } from '../../../services/item.service';
import { ServiceWithPrice } from '@app/models/item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html'
})
export class AddItemComponent implements OnInit {
  // Hardcoded categories as requested
  categories: string[] = ['ladies', 'gents', 'kids', 'other'];
  // Hardcoded services as requested
  availableServices: string[] = ['Wash and Dry', 'Dry Clean', 'Press Only'];

  imageUrl: string = '';
  itemName: string = '';
  description: string = '';
  selectedCategory: string = '';
  categoryId: string = '';
  services: ServiceWithPrice[] = [];
  isImageUploading: boolean = false;

  constructor(
    private dataService: DataService, 
    private itemService: ItemService
  ) {}

  ngOnInit() {
    // Set default category
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
      this.onCategoryChange();
    }
    
    // Add initial service
    this.addService();
  }

  // Method to fetch category ID by name
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

  // Method to fetch service ID by name
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
      // Fetch service ID for the newly added service
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
      
      // Upload image to backend
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

  onSubmit() {
    if (!this.itemName || !this.categoryId || this.services.length === 0) {
      alert('Please fill all required fields and add at least one service.');
      return;
    }

    if (this.isImageUploading) {
      alert('Please wait for image upload to complete.');
      return;
    }

    // Validate that all services have IDs (should be fetched automatically)
    for (const service of this.services) {
      if (!service.serviceId) {
        alert('Please wait for service IDs to be loaded or try again.');
        return;
      }
    }

    const payload = {
      name: this.itemName,
      description: this.description,
      categoryId: this.categoryId,
      imageUrl: this.imageUrl,
      services: this.services.map(s => ({
        serviceId: s.serviceId,
        price: s.price ?? 0
      }))
    };

    console.log('Sending payload:', payload); // Debug log
    this.itemService.addItem(payload).subscribe({
      next: () => alert('Item added successfully!'),
      error: err => {
        console.error('Full error:', err);
        alert('Error: ' + err.message);
      },
    });
  }
}
