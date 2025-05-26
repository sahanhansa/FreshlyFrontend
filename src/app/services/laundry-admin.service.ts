import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of, delay } from 'rxjs';
import { LaundryAdminDTO } from '../models/laundry-admin.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaundryAdminService {  private apiUrl = `${environment.apiUrl}/api/laundry`;
  private useMockData = true; // Set to false in production

  constructor(private http: HttpClient) {
    console.log('LaundryAdminService initialized with API URL:', this.apiUrl);
  }
    /**
   * Get all laundries for admin view
   */
  getLaundries(): Observable<LaundryAdminDTO[]> {
    // If using mock data, return mock data directly
    if (this.useMockData) {
      console.log('Using mock data for laundries');
      return this.getMockLaundries().pipe(
        delay(500) // Simulate network delay
      );
    }
    
    // Attempt to get data from the backend API
    return this.http.get<LaundryAdminDTO[]>(`${this.apiUrl}/admin`).pipe(
      catchError(error => {
        console.warn('Backend API not available, returning mock data');
        // Return mock data if the backend is not available
        return this.getMockLaundries();
      })
    );
  }
    /**
   * Get mock laundry data for testing when the backend is not available
   */
  private getMockLaundries(): Observable<LaundryAdminDTO[]> {
    const mockData: LaundryAdminDTO[] = [
      {
        laundryId: '6d7f5e8a-1c3b-4d2e-9a8f-3c6b5e7d8c9a',
        laundryName: 'Sparkle Clean Laundry',
        username: 'sparkle_clean',
        email: 'info@sparkleclean.com',
        ownerId: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        ownerName: 'John Smith',
        fullAddress: '123 Main St, New York, NY 10001',
        averageRating: 4.5,
        totalOrders: 128,
        feedbackCount: 98
      },
      {
        laundryId: '7e8f6d9c-2d3e-4b5a-8c7d-1e9f2a3b4c5d',
        laundryName: 'Quick Wash Laundromat',
        username: 'quick_wash',
        email: 'service@quickwash.com',
        ownerId: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7',
        ownerName: 'Alice Johnson',
        fullAddress: '456 Oak Ave, Chicago, IL 60007',
        averageRating: 4.2,
        totalOrders: 85,
        feedbackCount: 67
      },
      {
        laundryId: '8a9b7c6d-3e4f-5d6e-9f8e-7d6c5b4a3f2',
        laundryName: 'Fresh Fold Laundry',
        username: 'fresh_fold',
        email: 'hello@freshfold.com',
        ownerId: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8',
        ownerName: 'Robert Williams',
        fullAddress: '789 Pine Blvd, San Francisco, CA 94107',
        averageRating: 4.8,
        totalOrders: 210,
        feedbackCount: 180
      },
      {
        laundryId: '9b8c7d6e-4f5g-6h7i-8j9k-0l1m2n3o4p5',
        laundryName: 'Bubble & Foam Wash',
        username: 'bubble_foam',
        email: 'contact@bubblefoam.com',
        ownerId: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9',
        ownerName: 'Emily Davis',
        fullAddress: '321 Maple Dr, Austin, TX 78701',
        averageRating: 4.7,
        totalOrders: 152,
        feedbackCount: 118
      },
      {
        laundryId: '1z2y3x4w-5v6u-7t8s-9r0q-1p2o3n4m5l6',
        laundryName: 'Clean & Crisp Laundry',
        username: 'clean_crisp',
        email: 'info@cleancrisp.com',
        ownerId: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u',
        ownerName: 'Michael Wilson',
        fullAddress: '567 Birch St, Seattle, WA 98101',
        averageRating: 4.6,
        totalOrders: 175,
        feedbackCount: 130
      }
    ];
    
    return of(mockData);
  }

  /**
   * Get a specific laundry by ID
   */
  getLaundry(id: string): Observable<LaundryAdminDTO> {
    return this.http.get<LaundryAdminDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(`Failed to fetch laundry with ID ${id}`)(error))
    );
  }
  
  /**
   * Create a new laundry
   */
  createLaundry(laundry: LaundryAdminDTO): Observable<LaundryAdminDTO> {
    return this.http.post<LaundryAdminDTO>(this.apiUrl, laundry).pipe(
      catchError(error => this.handleError('Failed to create laundry')(error))
    );
  }
  
  /**
   * Update an existing laundry
   */
  updateLaundry(id: string, laundry: LaundryAdminDTO): Observable<LaundryAdminDTO> {
    return this.http.put<LaundryAdminDTO>(`${this.apiUrl}/${id}`, laundry).pipe(
      catchError(error => this.handleError(`Failed to update laundry with ID ${id}`)(error))
    );
  }
    /**
   * Delete a laundry
   */
  deleteLaundry(id: string): Observable<void> {
    // First try to delete from the backend
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.warn('Backend API not available for delete, simulating successful deletion');
        // Simulate successful deletion if backend is not available
        return of(void 0);
      })
    );
  }
    /**
   * Error handler
   */
  private handleError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`${operation}:`, error);

      let errorMessage = `${operation}. Please try again later.`;

      if (error.status === 0) {
        errorMessage = 'Cannot reach the server. Please check if the API is running at http://localhost:5027/api/laundry.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Bad request. Please check your input.';
      } else if (error.status === 404) {
        errorMessage = 'API endpoint not found. Make sure the backend service is configured correctly.';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      return throwError(() => new Error(errorMessage));
    };
  }
}
