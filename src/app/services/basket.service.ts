import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddToBasketDTO, BasketItemDTO } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl = `${environment.apiUrl}/api/TemporaryOrder`;

  constructor(private http: HttpClient) { }

  /**
   * Adds an item to the basket
   * @param customerId The ID of the customer
   * @param laundryId The ID of the selected laundry
   * @param item The item to add to the basket
   * @returns An observable with the temporary order ID
   */
  addToBasket(customerId: string, laundryId: string, items: BasketItemDTO[]): Observable<{temporaryOrderId: string}> {
    const dto: AddToBasketDTO = {
      customerId,
      laundryId,
      items
    };
    
    return this.http.post<{temporaryOrderId: string}>(`${this.apiUrl}/add-to-basket`, dto);
  }
  
  /**
   * Adds a single item to the basket
   * @param customerId The ID of the customer
   * @param laundryId The ID of the selected laundry
   * @param itemId The ID of the item
   * @param serviceId The ID of the selected service
   * @param quantity The quantity of the item
   * @returns An observable with the temporary order ID
   */
  addItemToBasket(customerId: string, laundryId: string, itemId: string, serviceId: string, quantity: number): Observable<{temporaryOrderId: string}> {
    const items: BasketItemDTO[] = [
      {
        itemId,
        serviceId,
        quantity
      }
    ];
    
    return this.addToBasket(customerId, laundryId, items);
  }
}
