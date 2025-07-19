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

  constructor(private http: HttpClient) { }

  // Method to fetch items for a specific laundry by its ID
  getItems(laundryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetItemsByLaundryId/${laundryId}`)
      .pipe(
        map(items => {
          console.log('Raw API response:', items);
          return items; // Return the raw API response as it matches our interface
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
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    return this.http.post(`${this.apiUrl}/add-item/${laundryId}`, item, {
      responseType: 'text' as 'json',
      observe: 'response'
    }).pipe(
      map(response => {
        try {
          return response.body ? JSON.parse(response.body as string) : response.body;
        } catch {
          return response.body;
        }
      }),
      catchError(error => {
        console.error('ItemService - error:', error);
        let errorMessage = 'Failed to add item. Please try again.';
        if (error.error?.message) errorMessage = error.error.message;
        else if (error.message) errorMessage = error.message;
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Get single item by ID
  getItemById(itemId: string): Observable<Item> {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    return this.http.get<any>(`${this.apiUrl}/GetItemById/${itemId}/${laundryId}`)
      .pipe(
        map(item => this.mapDtoToItem(item)),
        catchError(error => {
          console.error('Error fetching item:', error);
          return throwError(() => new Error('Failed to load item. Please try again.'));
        })
      );
  }

  // Update item method
  updateItem(itemId: string, item: AddItemDTO): Observable<any> {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    return this.http.put(`${this.apiUrl}/update-item/${itemId}/${laundryId}`, item, {
      responseType: 'text' as 'json',
      observe: 'response'
    }).pipe(
      map(response => {
        try {
          return response.body ? JSON.parse(response.body as string) : response.body;
        } catch {
          return response.body;
        }
      }),
      catchError(error => {
        console.error('ItemService - error:', error);
        let errorMessage = 'Failed to update item. Please try again.';
        if (error.error?.message) errorMessage = error.error.message;
        else if (error.message) errorMessage = error.message;
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
