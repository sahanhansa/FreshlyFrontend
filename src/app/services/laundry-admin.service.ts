import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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
    // Use the correct endpoint for getting laundries for admin
    return this.http.get<LaundryAdminDTO[]>(`${this.apiUrl}/laundry-list-for-admin`).pipe(
      catchError(this.handleError('Failed to fetch laundries'))
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
  private handleError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`${operation}:`, error);

      let errorMessage = `${operation}. Please try again later.`;

      if (error.status === 0) {
        errorMessage = 'Cannot reach the server. Please check if the API is running at http://localhost:5027/api/Laundry.';
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
