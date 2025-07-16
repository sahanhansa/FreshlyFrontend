import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of } from 'rxjs';
import { LaundryAdminDTO } from '../models/laundry-admin.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaundryAdminService {
  private apiUrl = `${environment.apiUrl}/api/Laundry`;
  
  constructor(private http: HttpClient) {
    console.log('LaundryAdminService initialized with API URL:', this.apiUrl);
  }
  
  /**
   * Get all laundries for admin view
   */
  getLaundries(): Observable<LaundryAdminDTO[]> {
    // Use the correct endpoint for getting all laundries
    return this.http.get<LaundryAdminDTO[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching laundries:', error);
        
        // For development purposes only - return mock data if the API fails
        // Comment this out or remove in production
        if (error.status === 404 || error.status === 0) {
          console.warn('API endpoint not found, using mock data');
          return of(this.getMockLaundries());
        }
        
        return this.handleError('Failed to fetch laundries')(error);
      })
    );
  }

  /**
   * Get a specific laundry by ID
   */
  getLaundry(id: string): Observable<LaundryAdminDTO> {
    return this.http.get<LaundryAdminDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError(`Failed to fetch laundry with ID ${id}`))
    );
  }
  
  /**
   * Create a new laundry
   */
  createLaundry(laundry: LaundryAdminDTO): Observable<LaundryAdminDTO> {
    return this.http.post<LaundryAdminDTO>(this.apiUrl, laundry).pipe(
      catchError(this.handleError('Failed to create laundry'))
    );
  }
  
  /**
   * Update an existing laundry
   */
  updateLaundry(id: string, laundry: LaundryAdminDTO): Observable<LaundryAdminDTO> {
    return this.http.put<LaundryAdminDTO>(`${this.apiUrl}/${id}`, laundry).pipe(
      catchError(this.handleError(`Failed to update laundry with ID ${id}`))
    );
  }
  
  /**
   * Delete a laundry
   */
  deleteLaundry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError(`Failed to delete laundry with ID ${id}`))
    );
  }
  
  /**
   * Error handler
   */
  private handleError(message: string) {
    return (error: any): Observable<never> => {
      console.error(message, error);
      return throwError(() => new Error(`${message}: ${error.message}`));
    };
  }
  
  /**
   * Mock data for development/testing purposes
   * This should be removed in production
   */
  private getMockLaundries(): LaundryAdminDTO[] {
    return [
      {
        laundryId: '1001',
        laundryName: 'CleanPress Laundry',
        username: 'cleanpress',
        email: 'contact@cleanpress.com',
        ownerId: '101',
        ownerName: 'John Doe',
        fullAddress: '123 Main Street, Colombo 3, Sri Lanka',
        averageRating: 4.5,
        totalOrders: 250,
        feedbackCount: 150
      },
      {
        laundryId: '1002',
        laundryName: 'SparkleFresh Services',
        username: 'sparklefresh',
        email: 'info@sparklefresh.com',
        ownerId: '102',
        ownerName: 'Jane Smith',
        fullAddress: '45 Park Avenue, Kandy, Sri Lanka',
        averageRating: 4.2,
        totalOrders: 180,
        feedbackCount: 95
      },
      {
        laundryId: '1003',
        laundryName: 'Quick & Clean Laundry',
        username: 'quickclean',
        email: 'service@quickclean.com',
        ownerId: '103',
        ownerName: 'Robert Johnson',
        fullAddress: '78 Beach Road, Galle, Sri Lanka',
        averageRating: 4.7,
        totalOrders: 320,
        feedbackCount: 210
      }
    ];
  }
}
