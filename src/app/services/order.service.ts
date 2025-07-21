import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, shareReplay } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/Order`;
  private laundryApiUrl = `${environment.apiUrl}/api/Laundry`;
  private cache = new Map<string, any>();


  constructor(private http: HttpClient) {}

  getNewOrders(laundryId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${laundryId}/new-orders`).pipe(

    
      catchError(this.handleError)
    );
  }


  getProcessingOrders(laundryId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${laundryId}/processing-orders`).pipe(
      catchError(this.handleError)
    );
  }


  getCompletedOrders(laundryId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${laundryId}/completed-orders`).pipe(
      catchError(this.handleError)
    );
  }


  getAllOrders(laundryId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${laundryId}/all-orders`).pipe(
      catchError(this.handleError)
    );
  }

  getOrderDetails(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/details`).pipe(
      catchError(this.handleError)
    );
  }

  getOrderDetailsById(laundryId: string, orderId: string, statusId: string): Observable<any> {
    const cacheKey = `order-details-${laundryId}-${orderId}-${statusId}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    // Make API call with timeout and caching
    const request = this.http.get<any>(`${this.laundryApiUrl}/order-details/${laundryId}/${orderId}/${statusId}`).pipe(
      timeout(10000), // 10 second timeout
      map(response => {
        // Cache the successful response
        this.cache.set(cacheKey, of(response).pipe(shareReplay(1)));
        return response;
      }),
      catchError(this.handleError)
    );
    
    // Cache the request
    this.cache.set(cacheKey, request.pipe(shareReplay(1)));
    
    return request;
  }

  updateOrderStatus(laundryId: string, orderId: string, statusId: string): Observable<any> {
    return this.http.put<any>(`${this.laundryApiUrl}/order-details/${laundryId}/${orderId}/${statusId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  patchOrderStatus(laundryId: string, orderId: string, statusId: string): Observable<any> {
    return this.http.patch<any>(`${this.laundryApiUrl}/order-details/${laundryId}/${orderId}/${statusId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('OrderService Error:', error);
    
    if (error.status === 0) {
      return throwError(() => new Error('Network error. Please check your connection.'));
    } else if (error.status === 404) {
      return throwError(() => new Error('Order not found.'));
    } else if (error.status === 500) {
      return throwError(() => new Error('Server error. Please try again later.'));
    } else {
    return throwError(() => new Error('Failed to fetch orders. Please try again later.'));
    }
  }

  // Clear cache method for manual cache invalidation
  clearCache(): void {
    this.cache.clear();
  }
}
