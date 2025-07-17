import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Item } from '../models/item.model';
import { AddItemDTO } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // Backend API endpoint URL
  private apiUrl = 'http://localhost:5027/api/Item'; 

 private readonly TEST_LAUNDRY_ID = 'efaa5020-331b-11f0-a791-c138d5830fc3';

  constructor(private http: HttpClient) { }

  // Method to fetch items for a specific laundry by its ID
  getItems(laundryId: string): Observable<Item[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetItemsByLaundryId/${laundryId}`)
      .pipe(
        map(items => {
          console.log('Raw API response:', items);
          return items.map(item => this.mapDtoToItem(item));
        }),
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

  // Add new item method
addItem(item: AddItemDTO): Observable<any> {
  // Override laundryId in the item DTO with the test laundry ID
  const payload = { ...item, laundryId: this.TEST_LAUNDRY_ID };
  
  console.log('ItemService - Sending payload:', payload);
  console.log('ItemService - API URL:', `${this.apiUrl}/add-item`);

  return this.http.post(`${this.apiUrl}/add-item`, payload, {
    responseType: 'text' as 'json',
    observe: 'response'
  })
    .pipe(
      map(response => {
        console.log('ItemService - Response status:', response.status);
        console.log('ItemService - Response body:', response.body);
        
        // Try to parse as JSON if possible, otherwise return as text
        try {
          return response.body ? JSON.parse(response.body as string) : response.body;
        } catch (e) {
          return response.body; // Return as text if JSON parsing fails
        }
      }),
      catchError(error => {
        console.error('ItemService - Full error details:', error);
        console.error('ItemService - Error status:', error.status);
        console.error('ItemService - Error message:', error.message);
        console.error('ItemService - Error body:', error.error);
        
        let errorMessage = 'Failed to add item. Please try again.';
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
}
}
