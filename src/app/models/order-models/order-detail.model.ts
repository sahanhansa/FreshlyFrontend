export interface OrderDetailsDTO {
  orderId: string;
  orderIdFormatted: string;
  orderDate: string;
  orderDateFormatted: string;
  laundryId: string;
  laundryName: string;
  laundryLocation: string;
  items: OrderItemDTO[];
  totalAmount: number;
  status: string;
  pickupDate: string;
  pickupDateFormatted: string;
  shouldShowPickupDetails: boolean;
}

export interface OrderItemDTO {
  itemName: string;
  quantity: number;
  price: number;
  itemId: string;
  serviceId: string;
  serviceName: string;
}
