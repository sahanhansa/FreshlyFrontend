import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map, of, tap } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5027/api/order';
  private isDebugging = true; // Set to true to enable debugging logs

  constructor(private http: HttpClient) { }

  /**
   * Test connection to the backend
   * @returns Observable with connection status
   */
  testConnection(): Observable<{success: boolean, message: string}> {
    console.log('Testing backend connection to:', this.apiUrl);
    return this.http.get<any>(`${this.apiUrl}/health`, { 
      headers: { 'X-Debug-Mode': 'true' }
    }).pipe(
      tap(response => {
        console.log('✅ Backend connection successful:', response);
        debugger; // This will pause execution in DevTools when debugging is enabled
      }),
      map(() => ({ success: true, message: 'Connection to backend successful' })),
      catchError(error => {
        console.error('❌ Backend connection failed:', error);
        debugger; // This will pause execution in DevTools when debugging is enabled
        return of({ success: false, message: `Connection failed: ${this.getErrorMessage(error)}` });
      })
    );
  }

  /**
   * Get all orders from the backend
   */
  getOrders(): Observable<Order[]> {
    if (this.isDebugging) console.log('🔍 Fetching all orders from:', this.apiUrl);
    
    return this.http.get<Order[]>(this.apiUrl).pipe(
      tap(orders => {
        if (this.isDebugging) {
          console.log(`✅ Successfully received ${orders.length} orders`);
          debugger; // This will pause execution in DevTools when debugging is enabled
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Get order details using the details endpoint
   */
  getOrderDetails(): Observable<Order[]> {
    if (this.isDebugging) console.log('🔍 Fetching order details from:', `${this.apiUrl}/details`);
    
    return this.http.get<any[]>(`${this.apiUrl}/details`)
      .pipe(
        tap(orders => {
          if (this.isDebugging) {
            console.log(`✅ Successfully received ${orders.length} order details`);
            debugger; // This will pause execution in DevTools when debugging is enabled
          }
        }),
        map(orders => {
          return orders.map(order => ({
            ...order,
            customer: order.customer ? {
              ...order.customer,
              address: order.customer.address?.fullAddress
            } : undefined
          }));
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get a specific order by ID
   */
  getOrder(id: string): Observable<Order> {
    if (this.isDebugging) console.log(`🔍 Fetching order with ID: ${id} from: ${this.apiUrl}/${id}`);
    
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      tap(order => {
        if (this.isDebugging) {
          console.log('✅ Successfully received order:', order);
          debugger; // This will pause execution in DevTools when debugging is enabled
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Create a new order
   */
  createOrder(order: Order): Observable<Order> {
    if (this.isDebugging) console.log('📝 Creating new order:', order);
    
    return this.http.post<Order>(this.apiUrl, order).pipe(
      tap(createdOrder => {
        if (this.isDebugging) {
          console.log('✅ Successfully created order:', createdOrder);
          debugger; // This will pause execution in DevTools when debugging is enabled
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing order
   */
  updateOrder(id: string, order: Order): Observable<Order> {
    if (this.isDebugging) console.log(`📝 Updating order with ID: ${id}`, order);
    
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order).pipe(
      tap(updatedOrder => {
        if (this.isDebugging) {
          console.log('✅ Successfully updated order:', updatedOrder);
          debugger; // This will pause execution in DevTools when debugging is enabled
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Delete an order
   */
  deleteOrder(id: string): Observable<any> {
    if (this.isDebugging) console.log(`🗑️ Deleting order with ID: ${id}`);
    
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(response => {
        if (this.isDebugging) {
          console.log('✅ Successfully deleted order:', response);
          debugger; // This will pause execution in DevTools when debugging is enabled
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Convert HttpErrorResponse to more readable format
   */
  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Client-side error: ${error.error.message}`;
    }
    return `Server-side error: ${error.status} - ${error.statusText || 'Unknown'} - ${error.message}`;
  }

  /**
   * Error handler with debugging capabilities
   */
  private handleError = (error: HttpErrorResponse) => {
    console.error('❌ API request failed:', error);
    
    // Add more detailed logging based on error type
    if (error.status === 0) {
      console.error('🔌 Network error - Is the backend server running?');
    } else if (error.status === 404) {
      console.error('⚠️ API endpoint not found - Check API URL');
    } else if (error.status >= 500) {
      console.error('⚠️ Backend server error - Check server logs');
    }
    
    debugger; // This will pause execution in DevTools when debugging is enabled
    return throwError(() => error);
  }
}