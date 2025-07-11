// Interface defines the structure of a Laundry object for the frontend
export interface Laundry {
  id: number;       
  name: string;     
  location: string; 
  rating: number;   
  hasRatings: boolean; 
  imageUrl: string; 
  isFavorite?: boolean; 
  itemIds: number[]; 
}

// DTO matching what the backend controller returns
export interface LaundryWithAddressDTO {
  laundryId: string;      
  laundryName: string;    
  city: string;           
  averageRating?: number; 
  LaundryId?: string;
  LaundryName?: string;
  City?: string;
  AverageRating?: number;
}


export interface LaundryDetails {
  laundryId: string;
  laundryName?: string;
  laundryEmail?: string;
  laundryImageLink?: string;
  houseNo?: string;
  street?: string;
  city?: string;
username?: string;
}
