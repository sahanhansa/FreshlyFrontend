import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddToBasketDTO, BasketItemDTO, TemporaryOrderSummary, ConfirmOrderDTO } from '../models/basket.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl = `${environment.apiUrl}/api/TemporaryOrder`;

  // private readonly temporaryCustomerId = '8afcc2dc-80cf-4247-b372-aca6371a5da7';

  // constructor(private http: HttpClient) { }

  // //Gets the hardcoded customer ID (temporary solution)
  // //@returns The temporary customer ID
  // getCustomerId(): string {
  //   return this.temporaryCustomerId;
  // }
  
  constructor(private http: HttpClient, private userService: UserService) { }

  // Gets the customer ID from localStorage or returns null if not logged in
  getCustomerId(): string | null {
    return localStorage.getItem('userId');
  }

  // Adds an item to the basket
  // @returns An observable with the temporary order ID
  addToBasket(laundryId: string, items: BasketItemDTO[]): Observable<{temporaryOrderId: string}> {
    const customerId = this.getCustomerId();
    
    if (!customerId) {
      return throwError(() => new Error('User not authenticated. Please log in first.'));
    }
    
    const dto: AddToBasketDTO = {
      customerId,
      laundryId,
      items
    };
    
    console.log('Adding to basket with data:', dto);
    return this.http.post<{temporaryOrderId: string}>(`${this.apiUrl}/add-to-basket`, dto);
  }
  
  /**
   * Adds a single item to the basket
   * @returns An observable with the temporary order ID
   */
  addItemToBasket(laundryId: string, itemId: string, serviceId: string, quantity: number,garmentTypeId: string): Observable<{temporaryOrderId: string}> {
    const items: BasketItemDTO[] = [
      {
        //laundryId,
        itemId,
        serviceId,
        quantity,
        garmentTypeId
      }
    ];
    
    return this.addToBasket(laundryId, items);
  }

  /**
   * Gets all temporary order summaries for the hardcoded customer
   * @returns An observable with the order summaries
   */
  getCustomerOrderSummaries(): Observable<TemporaryOrderSummary[]> {
    const customerId = this.getCustomerId();
    
    if (!customerId) {
      return throwError(() => new Error('User not authenticated. Please log in first.'));
    }
    
    return this.http.get<TemporaryOrderSummary[]>(`${this.apiUrl}/customer/${customerId}/summaries`);
  }

  /**
   * Deletes a temporary order
   * @param orderId The ID of the order to delete
   * @returns An observable with the result
   */
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}/delete`);
  }

  /**
   * Places an order (converts temporary order to actual order)
   * @param orderId The ID of the temporary order
   * @returns An observable with the result
   */
  placeOrder(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/place`, {});
  }

  /**
   * Deletes an item from a temporary order
   */
  deleteItemFromOrder(temporaryOrderId: string, itemId: string, serviceId: string) {
    return this.http.delete(
      `${this.apiUrl}/${temporaryOrderId}/item/${itemId}/service/${serviceId}`
    );
  }

  /**
   * Confirms an order (places it and updates all related data)
   * @param dto ConfirmOrderDTO
   * @returns Observable<boolean>
   */
  confirmOrder(dto: ConfirmOrderDTO) {
    return this.http.post<boolean>(`${environment.apiUrl}/api/order/confirm`, dto);
  }
}
