import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { environment } from '../../../../environments/environment';

interface Laundry {
  laundryId: string;
  laundryName: string;
  city: string;
  laundryImageLink: string;
  averageRating: number;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-laundries',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="bg-[#F5F5F5] rounded-lg shadow-sm p-6 ">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800 px-6">All Laundries</h2>
        <button class="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1">
          view all
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          *ngFor="let laundry of laundries" 
          class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 relative"
        >
          <button 
            (click)="toggleFavorite(laundry.laundryId)"
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

          <div class="flex justify-center mb-4">
            <img 
              [src]="laundry.laundryImageLink || 'assets/Home/washing.png'" 
              [alt]="laundry.laundryName"
              class="w-20 h-20 object-contain"
            />
          </div>

          <!-- ✅ Rating Stars (blue filled & white empty) -->
          <div class="flex justify-center mb-2 gap-0.5">
            <!-- Filled blue stars -->
            <svg 
              *ngFor="let _ of getStars(laundry.averageRating)" 
              class="w-4 h-4 text-blue-500 fill-current" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 
              1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
              0 1.371 1.24.588 1.81l-2.8 2.034a1 
              1 0 00-.364 1.118l1.07 
              3.292c.3.921-.755 
              1.688-1.54 1.118l-2.8-2.034a1 
              1 0 00-1.175 0l-2.8 
              2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
              1 0 00-.364-1.118L2.98 
              8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
              1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <!-- Empty white (or gray) stars -->
            <svg 
              *ngFor="let _ of getStars(5 - laundry.averageRating)" 
              class="w-4 h-4 text-gray-300 fill-current" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 
              1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
              0 1.371 1.24.588 1.81l-2.8 2.034a1 
              1 0 00-.364 1.118l1.07 
              3.292c.3.921-.755 
              1.688-1.54 1.118l-2.8-2.034a1 
              1 0 00-1.175 0l-2.8 
              2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
              1 0 00-.364-1.118L2.98 
              8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
              1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>

          <div class="text-center">
            <h3 class="font-semibold text-gray-800 mb-1">{{ laundry.laundryName }}</h3>
            <p class="text-sm text-gray-600">{{ laundry.city }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LaundriesCardCustomerComponent implements OnInit {
  laundries: Laundry[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLaundries();
  }

  loadLaundries(): void {
    this.http.get<Laundry[]>(`${environment.apiUrl}/api/Basic/laundries-with-image`)
      .subscribe({
        next: (data) => {
          this.laundries = data.map(l => ({ ...l, isFavorite: false }));
        },
        error: (error) => {
          console.error('Error loading laundries:', error);
        }
      });
  }

  toggleFavorite(laundryId: string): void {
    const laundry = this.laundries.find(l => l.laundryId === laundryId);
    if (laundry) {
      laundry.isFavorite = !laundry.isFavorite;
    }
  }

  getStars(count: number): number[] {
    return Array(Math.round(count)).fill(0);
  }
}
