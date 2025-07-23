// Interface defining a item service with its price information
export interface ServiceWithPrice {
  serviceId: string;
  serviceName: string | null;
  price: number | null;
}

// Main interface for laundry items 
export interface Item {
  itemId: string;
  itemName: string | null;
  categoryName: string | null; 
  description?: string;
  image?: string;
  imageUrl?: string;
  services: ServiceWithPrice[];
}

export interface AddItemDTO {
  name: string;
  description?: string;
  categoryId: string;
  imageUrl?: string;
  garmentTypes: {
    garmentTypeId: string;
    services: {
      serviceId: string;
      serviceName: string | null;
      price: number;
    }[];
  }[];
}

export type ItemCategory = 'ladies' | 'gents' | 'kids' | 'other';
