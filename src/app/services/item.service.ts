import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // Backend API endpoint URL
  private apiUrl = 'http://localhost:5027/api/Item'; 

  constructor(private http: HttpClient) { }

  // Method to fetch items for a specific laundry by its ID
  getItems(laundryId: string): Observable<Item[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetItemsByLaundryId/${laundryId}`)
      .pipe(
        map(items => {
          console.log('Raw API response:', items);
          return items.map(item => this.mapDtoToItem(item));
        }),
        // Handle errors that might occur during the API request
        catchError(error => {
          console.error('Error fetching items:', error);
          return throwError(() => new Error('Failed to load items. Please try again.'));
        })
      );
  }
  
  // Helper method to transform DTO to Item model
  private mapDtoToItem(dto: any): Item {
    return {
      itemId: dto.itemId,
      itemName: dto.itemName || 'Unknown Item',
      categoryName: dto.categoryName || 'other',
      image: dto.image || 'assets/default.png',
      description: dto.description || `${dto.itemName || 'Item'}`,
      services: dto.services?.map((s: any) => ({
        serviceId: s.serviceId,
        serviceName: s.serviceName || 'Unknown Service',
        price: s.price || 0
      })) || []
    };
  }
}
