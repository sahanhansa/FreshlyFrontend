export interface RejectedItem {
  rejectedItemId: string;
  orderId: string;
  itemId: string;
  serviceId: string;
  laundryId: string;
  itemName: string;
  quantity: number;
  reason: string;
  rejectedBy: string;
  rejectedAt: string; 
} 