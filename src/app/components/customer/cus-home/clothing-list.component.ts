import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ClothingItem {
  id?: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string; // Now required for image display
}

import { NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-clothing-list',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div class=" w-[100vw] px-14 !py-15 bg-[#F5F5F5]">
      <h2 class="text-xl font-bold text-gray-800 py-8">Popular Clothing Types</h2>
      
      <div class="w-[80vw] mx-auto">
      <div *ngIf="!isLoading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div *ngFor="let item of clothingItems" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02]">
          <!-- Image Placeholder (Replace with actual API imageUrl) -->
          <div class="h-48  flex items-center justify-center">
            <img 
              [src]="item.imageUrl || 'https://via.placeholder.com/200x200?text=' + item.name" 
              [alt]="item.name"
              class="object-cover h-30 w-30"
            >
          </div>
          <div class="p-2 flex justify-between items-center align-center">
            <p class="font-bold text-lg text-gray-800 truncate">{{ item.name }}</p>
            <p class="text-gray-800 font-normal ">RS.{{ item.price.toFixed(2) }}</p>
            </div>
            <p class="text-gray-800 font-extralight text-center text-[10px] pb-4">Cotton,Polyester,Denim,Linen,Silk,Wool</p>
        </div>
      </div>
      </div>


      <!-- Grid Layout -->
      

      <!-- Error State -->
      
    </div>
  `
})
export class ClothingListComponent implements OnInit {
  clothingItems: ClothingItem[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStaticDataWithImages(); // Replace with API call later
  }

  // Temporary: Static data with image placeholders
  loadStaticDataWithImages() {
    this.isLoading = true;
    setTimeout(() => {
      this.clothingItems = [
        { 
          name: 'Frock', 
          price: 250.00, 
          category: 'Traditional',
          imageUrl: 'assets/Home/frock.png' // Replace with real URLs
        },
        { 
          name: 'T-shirt', 
          price: 250.00, 
          category: 'Casual',
          imageUrl: 'assets/Home/frock.png'
        },
        { 
          name: 'T-shirt', 
          price: 250.00, 
          category: 'Casual',
          imageUrl: 'assets/Home/frock.png'
        },
        { 
          name: 'T-shirt', 
          price: 250.00, 
          category: 'Casual',
          imageUrl: 'assets/Home/frock.png'
        },
        { 
          name: 'T-shirt', 
          price: 250.00, 
          category: 'Casual',
          imageUrl: 'assets/Home/frock.png'
        },
        { 
          name: 'T-shirt', 
          price: 250.00, 
          category: 'Casual',
          imageUrl: 'assets/Home/frock.png'
        },
        { 
          name: 'T-shirt', 
          price: 250.00, 
          category: 'Casual',
          imageUrl: 'assets/Home/frock.png'
        },
        { 
          name: 'T-shirt', 
          price: 250.00, 
          category: 'Casual',
          imageUrl: 'assets/Home/frock.png'
        },
        // Add all other items...
      ];
      this.isLoading = false;
    }, 1000);
  }

  // Future API integration
  fetchFromDatabase() {
    // this.http.get<ClothingItem[]>('YOUR_API_ENDPOINT').subscribe({
    //   next: (data) => this.clothingItems = data,
    //   error: (err) => this.error = 'Failed to fetch data'
    // });
  }
}