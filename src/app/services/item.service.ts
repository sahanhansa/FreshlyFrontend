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
  getItemById(itemId: string): Observable<any> {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    // Use the correct GET endpoint
    const url = `${this.apiUrl}/GetItemByLaundryId/${laundryId}/${itemId}`;
    console.log('Calling API:', url);
    console.log('LaundryId:', laundryId);
    console.log('ItemId:', itemId);

    // Add authorization header if token exists
    const token = localStorage.getItem('token');
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.get<any>(url, { headers })
      .pipe(
        map(item => {
          console.log('Raw item response:', item);
          return item; // Return the raw API response
        }),
        catchError(error => {
          console.error('Error fetching item - Full error:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error URL:', error.url);
          return throwError(() => new Error(`Failed to load item: ${error.status} - ${error.message}`));
        })
      );
  }

  // Update item method using PATCH
  updateItem(itemId: string, item: AddItemDTO): Observable<any> {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    return this.http.patch(`${this.apiUrl}/update-item/${itemId}/${laundryId}`, item, {
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

  // Delete item method
  deleteItem(itemId: string): Observable<any> {
    const laundryId = localStorage.getItem('laundryId');
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    // Add authorization header if token exists
    const token = localStorage.getItem('token');
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.delete(`${this.apiUrl}/delete-item/${itemId}/${laundryId}`, { headers })
      .pipe(
        map(response => {
          console.log('Item deleted successfully:', response);
          return response;
        }),
        catchError(error => {
          console.error('ItemService - Delete error:', error);
          let errorMessage = 'Failed to delete item. Please try again.';
        if (error.error?.message) errorMessage = error.error.message;
        else if (error.message) errorMessage = error.message;
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
