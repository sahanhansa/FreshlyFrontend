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
  private apiUrl = `${environment.apiUrl}/api/Orders`; 
  private newOrdersUrl = `${this.apiUrl}/neworders`;

  constructor(private http: HttpClient) {}

  getNewOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.newOrdersUrl).pipe(
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
