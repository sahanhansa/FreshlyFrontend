import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderDetailsDTO } from '../../models/order-models/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = `${environment.apiUrl}/api/OrderDetail`;

  constructor(private http: HttpClient) {}

  // Get details for a specific order
  getOrderDetails(orderId: string): Observable<OrderDetailsDTO> {
    return this.http.get<OrderDetailsDTO>(`${this.apiUrl}/${orderId}`);
  }

  // Get all ongoing orders for a customer
  getOngoingOrders(customerId: string): Observable<OrderDetailsDTO[]> {
    return this.http.get<OrderDetailsDTO[]>(`${this.apiUrl}/customer/${customerId}/ongoing`);
  }

  // Delete an order (only allowed for "Order placed" status)
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancel/${orderId}`);
  }

  // Get orders that are out for delivery (to pay)
  getOutForDeliveryOrders(customerId: string): Observable<OrderDetailsDTO[]> {
    return this.http.get<OrderDetailsDTO[]>(`${this.apiUrl}/customer/${customerId}/outfordelivery`);
  }
}