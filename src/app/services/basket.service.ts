import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddToBasketDTO, BasketItemDTO, TemporaryOrderSummary } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl = `${environment.apiUrl}/api/TemporaryOrder`;
  private readonly temporaryCustomerId = 'e9194d78-2e64-11f0-a04a-30d0423f455f';

  constructor(private http: HttpClient) { }

  /**
   * Gets the hardcoded customer ID (temporary solution)
   * @returns The temporary customer ID
   */
  getCustomerId(): string {
    return this.temporaryCustomerId;
  }

  /**
   * Adds an item to the basket
   * @param laundryId The ID of the selected laundry
   * @param items The items to add to the basket
   * @returns An observable with the temporary order ID
   */
  addToBasket(laundryId: string, items: BasketItemDTO[]): Observable<{temporaryOrderId: string}> {
    const dto: AddToBasketDTO = {
      customerId: this.temporaryCustomerId,
      laundryId,
      items
    };
    
    console.log('Adding to basket with data:', dto);
    return this.http.post<{temporaryOrderId: string}>(`${this.apiUrl}/add-to-basket`, dto);
  }
  
  /**
   * Adds a single item to the basket
   * @param laundryId The ID of the selected laundry
   * @param itemId The ID of the item
   * @param serviceId The ID of the selected service
   * @param quantity The quantity of the item
   * @returns An observable with the temporary order ID
   */
  addItemToBasket(laundryId: string, itemId: string, serviceId: string, quantity: number): Observable<{temporaryOrderId: string}> {
    const items: BasketItemDTO[] = [
      {
        itemId,
        serviceId,
        quantity
      }
    ];
    
    return this.addToBasket(laundryId, items);
  }

  /**
   * Gets all temporary order summaries for the hardcoded customer
   * @returns An observable with the order summaries
   */
  getCustomerOrderSummaries(): Observable<TemporaryOrderSummary[]> {
    return this.http.get<TemporaryOrderSummary[]>(`${this.apiUrl}/customer/${this.temporaryCustomerId}/summaries`);
  }

  /**
   * Deletes a temporary order
   * @param orderId The ID of the order to delete
   * @returns An observable with the result
   */
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}`);
  }

  /**
   * Places an order (converts temporary order to actual order)
   * @param orderId The ID of the temporary order
   * @returns An observable with the result
   */
  placeOrder(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/place`, {});
  }
}
