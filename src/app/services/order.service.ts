import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/Order`; 
 


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

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('OrderService Error:', error);
    return throwError(() => new Error('Failed to fetch orders. Please try again later.'));
  }
}
