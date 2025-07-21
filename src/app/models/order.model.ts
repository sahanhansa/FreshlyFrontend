export interface OrderStatus {
  statusID: string;
  statusName: string;
  customerFName: string;
  statusDisplayName: string;
}

export interface CustomerAddress {
  addressId: string;
  houseNo: string;
  street: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  placedDate: string | null;
}

export interface Customer {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  customerFName: string;
  customerLName: string;
  address: CustomerAddress;
}

export interface Laundry {
  laundryId: string;
  laundryName: string;
  statusName: string;
}

export interface User {
  userId: string;
  username?: string;
}

export interface OrderItem {
  orderItemId?: string;
  item: string;
  process: string;
  clotheType: string;
  count: number;
  pricePerItem: number;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  placedDate: string;
  placedTime: string;
  pickupDate: string;
  pickupTime: string;
  placedDateTime: string;
  totalCost: number;
  customer: Customer;
  laundry: Laundry;
  status: OrderStatus;
  orderType: string | null;
  user: User | null;
}

// Order Detail interface for /api/OrderDetail/{orderId} endpoint
export interface OrderDetail {
    orderId: string;
  orderIdFormatted: string;
  orderDate: string;
  orderDateFormatted: string;
  laundryName: string;
  laundryLocation: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  pickupDate: string;
  pickupDateFormatted: string;
  shouldShowPickupDetails: boolean;
}