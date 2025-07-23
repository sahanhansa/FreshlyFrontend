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

/**
 * DTO for retrieving the basket
 */
export interface TemporaryOrderSummary {
  temporaryOrderId: string;
  laundryId: string; // Add this if it's not already there
  laundryName: string;
  laundryAddress: string;
  items: TemporaryOrderItem[];
  totalAmount: number;
}

export interface TemporaryOrderItem {
  itemId: string;
  itemName: string;
  itemImageUrl?: string;
  // categoryName?: string;
  serviceId: string; 
  serviceName: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export interface ConfirmOrderDTO {
  temporaryOrderId: string;
  pickupAt: string; // ISO string
  address?: AddressDTO;
}

export interface AddressDTO {
  addressId: string;
  houseNo?: string;
  street?: string;
  city?: string;
  postalCode?: string;
}