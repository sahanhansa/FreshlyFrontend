export interface CustomerAddress {
  addressId: string;
  houseNo: string;
  street: string;
  city: string;
  postalCode: string;
  contactNumbers?: string[]; // Add this field for contact numbers
}
