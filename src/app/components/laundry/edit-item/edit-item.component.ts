import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { DataService } from '../../../services/data.services';
import { ServiceWithPrice } from '@app/models/item.model';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule ],
  templateUrl: './edit-item.component.html',
})
export class EditItemComponent implements OnInit {
  imageUrl: string = 'assets/shirt.jpg';
  itemId: string = '';
  
  categories: string[] = ['ladies', 'gents', 'kids', 'other'];
  availableServices: string[] = ['Regular Wash', 'Dry Clean', 'Press Only'];

  item = {
    name: '',
    description: '',
    categoryId: '',
    categoryName: '',
    services: [] as ServiceWithPrice[]
  };

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      if (this.itemId) {
        this.loadItem();
      }
    });
  }

  loadItem() {
    this.itemService.getItemById(this.itemId).subscribe({
      next: (item) => {
        this.item = {
          name: item.itemName || '',
          description: item.description || '',
          categoryId: '',
          categoryName: item.categoryName || '',
          services: item.services || []
        };
        this.imageUrl = item.image || 'assets/shirt.jpg';
        
        // Set category ID based on category name
        if (this.item.categoryName) {
          this.dataService.getCategoryIdByName(this.item.categoryName).subscribe({
            next: (response) => {
              this.item.categoryId = response.categoryId;
            },
            error: (error) => {
              console.error('Error fetching category ID:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error loading item:', error);
        alert('Error loading item. Please try again.');
      }
    });
  }

  addService() {
    if (this.item.services.length < 3) {
      this.item.services.push({
        serviceId: '',
        serviceName: this.availableServices.length > 0 ? this.availableServices[0] : '',
        price: null
      });
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

  onSubmit() {
    if (!this.item.name || !this.item.categoryId || this.item.services.length === 0) {
      alert('Please fill all required fields and add at least one service.');
      return;
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
      next: () => alert('Item updated successfully!'),
      error: err => {
        console.error('Full error:', err);
        alert('Error: ' + err.message);
      },
    });
  }

}

