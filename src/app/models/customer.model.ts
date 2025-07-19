export interface Customer {
  customerId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  username: string | null;
  addressId: string | null;
  address: string | null;
  contacts: string[];
  accountStatus?: string | null;
}