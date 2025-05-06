export interface ServiceWithPrice {
  serviceId: string;
  serviceName: string | null;
  price: number | null;
}

export interface Item {
  itemId: string;
  itemName: string | null;
  categoryName: string | null; // Added categoryName property
  description?: string;
  image?: string;
  services: ServiceWithPrice[];
}

export type ItemCategory = 'ladies' | 'gents' | 'kids' | 'other';
