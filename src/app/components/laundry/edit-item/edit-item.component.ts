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
  
  categories: string[] = ['ladies', 'gents', 'kids', 'other'];
  availableServices: string[] = ['Regular Wash', 'Dry Clean', 'Press Only', 'Hand Wash'];

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
      next: (item: ItemResponse) => {
        console.log('Raw item response:', item);
        
        // Handle different possible response structures
        if (!item) {
          console.error('No item data received');
          alert('No item data received. Please try again.');
          return;
        }
        
        this.item = {
          name: item.name || item.itemName || '',
          description: item.description || '',
          categoryId: item.categoryId || '',
          categoryName: item.categoryName || '',
          services: item.services?.map(s => ({
            serviceId: s.serviceId,
            serviceName: s.serviceName,
            price: s.price
          })) || []
        };
        
        console.log('Loaded item description:', this.item.description);
        console.log('Loaded item category:', this.item.categoryName);
        this.imageUrl = item.imageUrl || 'assets/shirt.jpg';
        
        console.log('Mapped item data:', this.item);
        
        // Set category ID based on category name if not already provided
        if (this.item.categoryName && !this.item.categoryId) {
          this.dataService.getCategoryIdByName(this.item.categoryName).subscribe({
            next: (response) => {
              this.item.categoryId = response.categoryId;
              console.log('Category ID set:', this.item.categoryId);
            },
            error: (error) => {
              console.error('Error fetching category ID:', error);
            }
          });
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
    if (!this.item.name || !this.item.categoryId || this.item.services.length === 0) {
      alert('Please fill all required fields and add at least one service.');
      return;
    }

    // Check if all services have serviceId
    for (const service of this.item.services) {
      if (!service.serviceId) {
        alert('Please wait for service IDs to be loaded or try again.');
        return;
      }
    }

    const payload = {
      name: this.item.name,
      description: this.item.description,
      categoryId: this.item.categoryId,
      imageUrl: this.imageUrl,
      services: this.item.services.map(s => ({
        serviceId: s.serviceId,
        price: s.price ?? 0
      }))
    };

    console.log('Updating item with payload:', payload);
    this.itemService.updateItem(this.itemId, payload).subscribe({
      next: () => {
        alert('Item updated successfully!');
        this.itemUpdated.emit(); // Emit event to notify parent
        this.router.navigate(['/laundry-items']); // Navigate back to items page
      },
      error: err => {
        console.error('Full error:', err);
        alert('Error: ' + err.message);
      },
    });
  }

}

