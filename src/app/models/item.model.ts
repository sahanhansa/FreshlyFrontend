export interface Item {
  id: number;          // Unique identifier for each item
  name: string;        // Name of the item
  price: number;       // Price of the item
  description: string; // Description of the item
  image: string;       // Image URL for the item
  category?: string;   // Category of the item (Ladies, Gents, Kids, etc.)
  //laundryIds: number[]; // Array of laundry IDs this item belongs to
}