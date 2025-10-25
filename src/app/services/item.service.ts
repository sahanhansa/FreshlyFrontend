import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Item } from '../models/item.model';
import { AddItemDTO } from '../models/item.model';
import { StorageService } from './storage.service'; // ✅ Add import
import { LoggerService } from './logger.service'; // ✅ Add import

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:5027/api/Item';

  constructor(
    private http: HttpClient,
    private storage: StorageService, // ✅ Inject StorageService
    private logger: LoggerService // ✅ Inject LoggerService
  ) {}

  // Method to fetch items for a specific laundry by its ID
  getItems(laundryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetItemsByLaundryId/${laundryId}`)
      .pipe(
        map(items => {
          this.logger.log('Raw API response:', items); // ✅ Changed
          return items; // Return the raw API response as it matches our interface
        }),
        catchError(error => {
          this.logger.error('Error fetching items:', error); // ✅ Changed
          return throwError(() => new Error('Failed to load items. Please try again.'));
        })
      );
  }

  getItemsByLaundryIdAndGarmentId(laundryId: string, garmentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetItemsByLaundryId/${laundryId}/${garmentId}`)
      .pipe(
        map(items => {
          console.log('Raw API response for laundryId + garmentId:', items);
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
    const laundryId = this.storage.getLaundryId(); // ✅ Changed
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
    const laundryId = this.storage.getLaundryId(); // ✅ Changed
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    const url = `${this.apiUrl}/GetItemByLaundryId/${laundryId}/${itemId}`;
    this.logger.log('Calling API:', url); // ✅ Changed
    this.logger.log('LaundryId:', laundryId); // ✅ Changed
    this.logger.log('ItemId:', itemId); // ✅ Changed

    const token = this.storage.getToken(); // ✅ Changed
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.get<any>(url, { headers })
      .pipe(
        map(item => {
          this.logger.log('Raw item response:', item); // ✅ Changed
          return item; // Return the raw API response
        }),
        catchError(error => {
          this.logger.error('Error fetching item - Full error:', error); // ✅ Changed
          this.logger.error('Error status:', error.status); // ✅ Changed
          this.logger.error('Error message:', error.message); // ✅ Changed
          this.logger.error('Error URL:', error.url); // ✅ Changed
          return throwError(() => new Error(`Failed to load item: ${error.status} - ${error.message}`));
        })
      );
  }

  // Update item method using PUT
  updateItem(itemId: string, item: any): Observable<any> {
    const laundryId = this.storage.getLaundryId(); // ✅ Changed
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

  // Delete item method
  deleteItem(itemId: string): Observable<any> {
    const laundryId = this.storage.getLaundryId(); // ✅ Changed
    if (!laundryId) {
      return throwError(() => new Error('Laundry ID not found. Please login again.'));
    }

    const token = this.storage.getToken(); // ✅ Changed
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.delete(`${this.apiUrl}/delete-item/${itemId}/${laundryId}`, { headers })
      .pipe(
        map(response => {
          this.logger.log('Item deleted successfully:', response); // ✅ Changed
          return response;
        }),
        catchError(error => {
          this.logger.error('ItemService - Delete error:', error); // ✅ Changed
          let errorMessage = 'Failed to delete item. Please try again.';
          if (error.error?.message) errorMessage = error.error.message;
          else if (error.message) errorMessage = error.message;
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
