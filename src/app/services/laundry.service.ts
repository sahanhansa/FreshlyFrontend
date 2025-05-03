import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Laundry, LaundryWithAddressDTO } from '../models/laundry.model';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {
  private apiUrl = 'http://localhost:5027/api/Laundry'; // Your .NET API URL

  constructor(private http: HttpClient) {}

  // Get all laundries from the API
  getLaundries(): Observable<Laundry[]> {
    return this.http.get<LaundryWithAddressDTO[]>(this.apiUrl)
      .pipe(
        map(dtos => {
          console.log('Raw API response:', dtos);
          return this.mapDtosToLaundries(dtos);
        }),
        catchError(error => {
          console.error('Error fetching laundries:', error);
          return throwError(() => new Error('Failed to load laundries. Please try again later.'));
        })
      );
  }

  // Get a single laundry by ID
  getLaundryById(id: number): Observable<Laundry> {
    return this.http.get<LaundryWithAddressDTO>(`${this.apiUrl}/${id}`)
      .pipe(
        map(dto => this.mapDtoToLaundry(dto)),
        catchError(error => {
          console.error(`Error fetching laundry with ID ${id}:`, error);
          return throwError(() => new Error('Failed to load laundry details. Please try again later.'));
        })
      );
  }

  // Helper method to convert DTOs to domain models
  private mapDtosToLaundries(dtos: LaundryWithAddressDTO[]): Laundry[] {
    return dtos.map(dto => this.mapDtoToLaundry(dto));
  }

  // Helper method to convert a single DTO to domain model
  private mapDtoToLaundry(dto: any): Laundry {
    // This function will work regardless of casing
    return {
      id: parseInt(dto.laundryId || dto.LaundryId || '0'),
      name: dto.laundryName || dto.LaundryName || 'Unnamed Laundry',
      location: dto.city || dto.City || 'Location not available',
      rating: 5,
      imageUrl: 'assets/laundry.png',
      itemIds: []
    };
  }
}

