
import { Component, OnInit } from '@angular/core';

interface Laundry {
  id: number;
  name: string;
  location: string;
  rating: number;
  isFavorite: boolean; // Optional image URL
}

import { NgFor } from '@angular/common';
@Component({
  selector: 'app-laundries',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="bg-[#F5F5F5] rounded-lg shadow-sm p-6 ">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800 px-6">All Laundries</h2>
        <button class="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1">
          view all
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Laundries Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          *ngFor="let laundry of laundries" 
          class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 relative"
        >
          <!-- Favorite Icon -->
          <button 
            (click)="toggleFavorite(laundry.id)"
            class="absolute top-2 right-2 p-1 rounded-full hover:bg-white transition-colors"
          >
            <svg 
              class="w-5 h-5" 
              [class]="laundry.isFavorite ? 'text-blue-500 fill-current' : 'text-gray-400'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>

          <!-- Washing Machine Image -->
          <div class="flex justify-center mb-4">
            <div class="relative">
              <!-- Replace this div with your actual washing machine image -->
              <img 
                src="assets/Home/washing.png" 
                [alt]="laundry.name"
                class="w-20 h-20 object-contain"
              />
              <!-- Default washing machine placeholder -->
              <div 
                *ngIf="!laundry.image"
                class="w-20 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex items-center justify-center"
              >
                <div class="w-12 h-12 bg-blue-800 rounded-full border-2 border-blue-300 flex items-center justify-center">
                  <div class="w-8 h-8 bg-blue-900 rounded-full border border-blue-400"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rating Stars -->
          <div class="flex justify-center mb-2">
            <div class="flex gap-1">
              <svg 
                *ngFor="let star of getStars(laundry.rating)" 
                class="w-4 h-4 text-blue-500 fill-current" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <div flex gap-2> </div>
            <div class="flex gap-1">
              <svg 
                *ngFor="let star of getStars(5-laundry.rating)" 
                class="w-4 h-4 text-blue-200 fill-current" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
          </div>

          <!-- Laundry Info -->
          <div class="text-center">
            <h3 class="font-semibold text-gray-800 mb-1">{{ laundry.name }}</h3>
            <p class="text-sm text-gray-600">{{ laundry.location }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Additional custom styles if needed */
  `]
})
export class LaundriesCardCustomerComponent implements OnInit {
  
  // Sample data - replace with your actual API call
  laundries: Laundry[] = [
    {
      id: 1,
      name: 'Laundry 1',
      location: 'Nugegoda',
      rating: 5,
      isFavorite: true,
    // Add your washing machine image path here
    },
    {
      id: 2,
      name: 'Laundry 2',
      location: 'Moratuwa',
      rating: 3,
      isFavorite: false,
    // Add your washing machine image path here
    },
    {
      id: 3,
      name: 'Laundry 3',
      location: 'Bambalapitiya',
      rating: 5,
      isFavorite: false,
 // Add your washing machine image path here
    },
    {
      id: 4,
      name: 'Laundry 4',
      location: 'Piliyandala',
      rating: 5,
      isFavorite: false,
 // Add your washing machine image path here
    },
    {
      id: 5,
      name: 'Laundry 5',
      location: 'Gampaha',
      rating: 5,
      isFavorite: true,
  // Add your washing machine image path here
    },
    {
      id: 6,
      name: 'Laundry 6',
      location: 'Galle',
      rating: 5,
      isFavorite: false,
// Add your washing machine image path here
    },
    {
      id: 7,
      name: 'Laundry 7',
      location: 'Matara',
      rating: 5,
      isFavorite: false,
 // Add your washing machine image path here
    },
    {
      id: 8,
      name: 'Laundry 8',
      location: 'Bambalapitiya',
      rating: 5,
      isFavorite: false,
// Add your washing machine image path here
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Load laundries from database
    this.loadLaundries();
  }

  // Method to load laundries from your API/database
  loadLaundries(): void {
    // Replace this with your actual API call
    // this.laundryService.getAllLaundries().subscribe(
    //   (data: Laundry[]) => {
    //     this.laundries = data;
    //   },
    //   (error) => {
    //     console.error('Error loading laundries:', error);
    //   }
    // );
  }

  // Toggle favorite status
  toggleFavorite(laundryId: number): void {
    const laundry = this.laundries.find(l => l.id === laundryId);
    if (laundry) {
      laundry.isFavorite = !laundry.isFavorite;
      
      // Update in database
      // this.laundryService.updateFavorite(laundryId, laundry.isFavorite).subscribe(
      //   () => {
      //     console.log('Favorite status updated');
      //   },
      //   (error) => {
      //     console.error('Error updating favorite:', error);
      //     // Revert on error
      //     laundry.isFavorite = !laundry.isFavorite;
      //   }
      // );
    }
  }

  // Generate stars array for rating display
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}

// laundry.service.ts (Service for API calls)
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {
  private apiUrl = 'your-api-endpoint'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAllLaundries(): Observable<Laundry[]> {
    return this.http.get<Laundry[]>(`${this.apiUrl}/laundries`);
  }

  updateFavorite(laundryId: number, isFavorite: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/laundries/${laundryId}/favorite`, { isFavorite });
  }
}
*/