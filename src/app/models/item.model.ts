export interface ServiceWithPrice {
  serviceId: string;
  serviceName: string | null;
  price: number | null;
}

export class Item {
  itemId: string = '';
  itemName: string = '';
  description: string = '';
  image: string = '';
  services: ServiceWithPrice[] = [];
}
