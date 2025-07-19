import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Laundry, LaundryDetails, LaundryWithAddressDTO } from '../models/laundry.model'
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LaundryService {
  // Base URL for the laundry-related API endpoints
   private apiUrl = `${environment.apiUrl}/api/Laundry`; 

   private readonly TEST_LAUNDRY_ID = 'efaa5020-331b-11f0-a791-c138d5830fc3';

  constructor(private http: HttpClient) {
    console.log('LaundryService initialized with API URL:', this.apiUrl);
  }

  // Method to fetch all laundries from the backend API
  getLaundries(): Observable<Laundry[]> {
    return this.http.get<LaundryWithAddressDTO[]>(`${this.apiUrl}/laundry-list-for-customer`)
      .pipe(
        map(dtos => {
          console.log('Raw API response:', dtos);
          return this.mapDtosToLaundries(dtos);
        }),
        // Handle errors from the HTTP request
        catchError(error => {
          console.error('Error fetching laundries:', error);
          return throwError(() => new Error('Failed to load laundries. Please try again later.'));
        })
      );
  }

  // Method to fetch a specific laundry by its ID
  getLaundryById(id: number): Observable<Laundry> {
    return this.http.get<LaundryWithAddressDTO>(`${this.apiUrl}/${id}`)
      .pipe(
        map(dto => this.mapDtoToLaundry(dto)),
        // Handle errors specific to this request
        catchError(error => {
          console.error(`Error fetching laundry with ID ${id}:`, error);
          return throwError(() => new Error('Failed to load laundry details. Please try again later.'));
        })
      );
  }

  getLaundryDetails(id: string = this.TEST_LAUNDRY_ID): Observable<LaundryDetails[]> {
    const url = `${this.apiUrl}/get-laundry-details/${id}`;
    console.log('Fetching laundry details from:', url);
    
    return this.http.get<LaundryDetails[]>(url).pipe(
      tap(response => {
        console.log('Laundry details API response:', response);
      }),
      catchError(error => {
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
    const averageRating = dto.averageRating ?? dto.AverageRating ?? 0;
    const hasRatings = averageRating > 0;
    const roundedRating = Math.round(averageRating);
    
    return {
      id: dto.laundryId || "",
      name: dto.laundryName || dto.LaundryName || 'Unnamed Laundry',
      location: dto.city || dto.City || 'Location not available',
      rating: roundedRating,
      hasRatings: hasRatings,
      imageUrl: 'assets/laundry.png',
      itemIds: []
    };
  }
}

