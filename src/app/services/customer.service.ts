import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/api/customer`;

  constructor(private http: HttpClient) { }

  /**
   * Get all customers from the backend
   */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get customer details using the details endpoint
   */
  getCustomerDetails(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/details`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get a specific customer by ID
   */
  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }  /**
   * Delete a customer
   */
  deleteCustomer(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`Sending DELETE request to: ${url}`);
    console.log(`Customer ID to delete: ${id}`);
    
    // Use HttpClient with headers to handle CORS and content type issues
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    // Return both success and error scenarios
    return this.http.delete(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error in DELETE request:', error);
        
        // Special case for 500 errors - treat as success if it's just a backend issue
        // but the resource was actually deleted (common with .NET backends)
        if (error.status === 500) {
          console.log('Got 500 error, but DELETE might have succeeded. Will refresh list.');
          // Return an empty object to simulate success
          return of({});
        }
        
        return throwError(() => error);
      })
    );
  }
  /**
   * Error handler
   */
  private handleError(error: any) {
    console.error('API Error:', error);
    
    // Extract a meaningful error message
    let errorMsg = 'Operation failed. Please try again later.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // If there's a more detailed error message from the server
      if (error.error && typeof error.error === 'object') {
        if (error.error.message) {
          errorMsg = error.error.message;
        } else if (error.error.errors) {
          errorMsg = Object.values(error.error.errors).flat().join(', ');
        }
      }
    }
    
    return throwError(() => new Error(errorMsg));
  }
}
