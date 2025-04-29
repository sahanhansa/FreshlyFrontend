//blueprint of how laundry object should look like
export interface Laundry {
  id: number;       // Unique identifier for each laundry
  name: string;     // Laundry name
  location: string; // Location of the laundry
  rating: number;   // Rating (e.g., out of 5)
  imageUrl: string; // Image URL for the laundry
  isFavorite?: boolean; // Optional: Whether the laundry is marked as favorite
  itemIds: number[]; // Array of item IDs associated with this laundry
}
