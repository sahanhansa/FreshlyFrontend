/**
 * DTO for adding items to the basket
 */
export interface AddToBasketDTO {
  customerId: string;
  laundryId: string;
  items: BasketItemDTO[];
}

/**
 * Individual item for the basket
 */
export interface BasketItemDTO {
  itemId: string;
  serviceId: string;
  quantity: number;
}

/**
 * Response from the add-to-basket API
 */
export interface AddToBasketResponse {
  temporaryOrderId: string;
}