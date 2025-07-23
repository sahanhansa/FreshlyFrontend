import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GarmentTypeService {
  private garmentTypeMapping: { [key: string]: string[] } = {
    Shirt: ['Cotton', 'Linen', 'Silk'],
    Trousers: ['Denim', 'Polyester', 'Wool'],
    Skirt: ['Cotton', 'Silk', 'Linen'],
    Jacket: ['Leather', 'Wool', 'Polyester'],
    Default: ['Cotton', 'Polyester', 'Denim', 'Linen', 'Silk', 'Wool']
  };

  getGarmentTypes(itemName: string): string[] {
    return this.garmentTypeMapping[itemName] || this.garmentTypeMapping['Default'];
  }
}
