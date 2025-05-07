import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:5027/api/Item'; // Updated with correct controller name

  constructor(private http: HttpClient) { }

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
  
  private mapDtoToItem(dto: any): Item {
    return {
      itemId: dto.itemId,
      itemName: dto.itemName || 'Unknown Item',
      categoryName: dto.categoryName || 'other',
      // Provide default image if none exists
      image: dto.image || 'assets/default.png',
      // Add a default description if none exists
      description: dto.description || `${dto.itemName || 'Item'}`,
      // Map services
      services: dto.services?.map((s: any) => ({
        serviceId: s.serviceId,
        serviceName: s.serviceName || 'Unknown Service',
        price: s.price || 0
      })) || []
    };
  }
}
