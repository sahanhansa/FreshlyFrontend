export interface Customer {
  customerId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  username: string | null;
  contacts: string[] | null;  // Allow null
  address: string | null;
}