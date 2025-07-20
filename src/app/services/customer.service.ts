import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  /**
   * Update customer account status
   */
  updateCustomerStatus(customerId: string, status: string): Observable<void> {
    let endpoint = '';
    if (status === 'active') {
      endpoint = `${this.apiUrl}/${customerId}/activate`;
    } else if (status === 'inactive') {
      endpoint = `${this.apiUrl}/${customerId}/delete`;
    } else {
      throw new Error('Invalid status');
    }
    return this.http.patch<void>(endpoint, {}).pipe(
      catchError(error => this.handleError('Failed to update customer status')(error))
    );
  }
  private apiUrl = `${environment.apiUrl}/api/customer`;

  constructor(private http: HttpClient) { }

  /**
   * Get all customers from the backend
   */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      catchError(error => this.handleError('Failed to fetch customers')(error))
    );
  }

  /**
   * Get customer details using the details endpoint
   */
  getCustomerDetails(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/details`).pipe(
      catchError(error => this.handleError('Failed to fetch customer details')(error))
    );
  }

  /**
   * Get a specific customer by ID
   */
  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(`Failed to fetch customer with ID ${id}`)(error))
    );
  }
  
  /**
   * Delete a customer
   */
  deleteCustomer(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`Sending DELETE request to: ${url}`);
    console.log(`Customer ID to delete: ${id}`);
    
    // Use HttpClient with headers to handle CORS and content type issues
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    return this.http.delete<void>(url, { headers }).pipe(
      catchError(error => this.handleError(`Failed to delete customer with ID ${id}`)(error))
    );
  }
  
  /**
   * Error handler
   */
  private handleError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`${operation}:`, error);

      let errorMessage = `${operation}. Please try again later.`;

      if (error.status === 400) {
        errorMessage = error.error || 'Cannot delete customer due to associated orders or feedback. Please remove related orders or feedback first.';
      } else if (error.status === 404) {
        errorMessage = 'Customer not found.';
      } else if (error.status === 0) {
        errorMessage = 'Cannot reach the server. Please check if the API is running.';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      return throwError(() => new Error(errorMessage));
    };
  }
}