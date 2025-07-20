import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of } from 'rxjs';
import { LaundryAdminDTO } from '../models/laundry-admin.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaundryAdminService {
  /**
   * Create a new laundry account (with owner and address)
   */
  createLaundryAccount(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-laundry-account`, payload).pipe(
      catchError(this.handleError('Failed to create laundry account'))
    );
  }
  /**
   * Activate a laundry account
   */
  activateLaundry(laundryId: string): Observable<void> {
    const endpoint = `${this.apiUrl}/${laundryId}/activate`;
    return this.http.patch<void>(endpoint, {}).pipe(
      catchError(this.handleError(`Failed to activate laundry with ID ${laundryId}`))
    );
  }

  /**
   * Deactivate a laundry account
   */
  deactivateLaundry(laundryId: string): Observable<void> {
    const endpoint = `${this.apiUrl}/${laundryId}/deactivate`;
    return this.http.patch<void>(endpoint, {}).pipe(
      catchError(this.handleError(`Failed to deactivate laundry with ID ${laundryId}`))
    );
  }
  private apiUrl = `${environment.apiUrl}/api/Laundry`;
  
  constructor(private http: HttpClient) {
    console.log('LaundryAdminService initialized with API URL:', this.apiUrl);
  }
  
  /**
   * Get all laundries for admin view
   */
  getLaundries(): Observable<LaundryAdminDTO[]> {
    // Use the correct endpoint for getting all laundries for admin
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
  /**
   * Deactivate a laundry (PATCH /api/Laundry/{id}/delete)
   */
  deleteLaundry(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/delete`, {}).pipe(
      catchError(this.handleError(`Failed to deactivate laundry with ID ${id}`))
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
  
  // ...existing code...
}
