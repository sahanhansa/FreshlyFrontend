export interface OrderStatus {
  statusId: String;
  statusName: string;
}

export interface Customer {
  customerId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  contacts?: string[];
  address?: string;
}

export interface Laundry {
  laundryId: string;
  name?: string;
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
  placedDate: string | null;
  completedDate?: string;
  status?: OrderStatus;
  customer?: Customer;
  user?: User;
  laundry?: Laundry;
  items?: OrderItem[];
}