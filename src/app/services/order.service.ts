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
  private baseUrl = `${environment.apiUrl}/api/Orders`;
  // Temporary laundryId for testing - replace with actual ID in production
  private readonly TEST_LAUNDRY_ID = 'efaa5020-331b-11f0-a791-c138d5830fc3';

  constructor(private http: HttpClient) {}

  getNewOrders(laundryId: string = this.TEST_LAUNDRY_ID): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/${laundryId}/new-orders`).pipe(
      catchError(this.handleError)
    );
  }

  getProcessingOrders(laundryId: string = this.TEST_LAUNDRY_ID): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/${laundryId}/processing-orders`).pipe(
      catchError(this.handleError)
    );
  }

  getAllOrders(laundryId: string = this.TEST_LAUNDRY_ID): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/${laundryId}/all-orders`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('OrderService Error:', error);
    return throwError(() => new Error('Failed to fetch orders. Please try again later.'));
  }
}
