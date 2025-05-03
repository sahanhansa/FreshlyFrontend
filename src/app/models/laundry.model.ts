// Blueprint of how laundry object should look like for the frontend
export interface Laundry {
  id: number;       // Unique identifier for each laundry
  name: string;     // Laundry name
  location: string; // Location of the laundry (city in this case)
  rating: number;   // Rating (e.g., out of 5)
  imageUrl: string; // Image URL for the laundry
  isFavorite?: boolean; // Optional: Whether the laundry is marked as favorite
  itemIds: number[]; // Array of item IDs associated with this laundry
}

// DTO matching what the backend controller returns
// Update to match the actual camelCase properties from the API response
export interface LaundryWithAddressDTO {
  laundryId: string;    // camelCase as seen in API response
  laundryName: string;  // camelCase as seen in API response
  city: string;         // camelCase as seen in API response
}
