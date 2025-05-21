import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = `${environment.apiUrl}/api/Orders`;
  
  // Temporary itemid for testing 
  private readonly TEST_ITEM_ID = 'efaa5020-331b-11f0-a791-c138d5830fc3';

  constructor(private http: HttpClient) {}


  private items: Item[] = [
    { id: 1, name: 'Frock', price: 250, description: 'Ladies wear', image: './assets/frock.png' },
    { id: 2, name: 'Blouse', price: 250, description: 'Ladies wear', image: './assets/blouse.png' },
    { id: 3, name: 'T-shirt', price: 250, description: 'Ladies wear', image: './assets/tshirt.png' },
    { id: 4, name: 'Shirt', price: 250, description: 'Ladies wear', image: './assets/shirt.png' },
    { id: 5, name: 'Denim', price: 250, description: 'Ladies wear', image: './assets/denim.png' },
    { id: 6, name: 'Saree', price: 250, description: 'Ladies wear', image: './assets/saree.png' },
    { id: 7, name: 'Skirt', price: 250, description: 'Ladies wear', image: './assets/skirt.png' },
    { id: 8, name: 'Dress', price: 250, description: 'Ladies wear', image: './assets/dress.png' },
    { id: 9, name: 'Trousers', price: 250, description: 'Gents wear', image: './assets/trousers.png' },
    { id: 10, name: 'Shorts', price: 250, description: 'Gents wear', image: './assets/shorts.png' },
    { id: 11, name: 'Suit', price: 250, description: 'Gents wear', image: './assets/suit.png' },
    { id: 12, name: 'Jacket', price: 250, description: 'Gents wear', image: './assets/jacket.png' },
    { id: 13, name: 'Baby Frock', price: 250, description: 'Baby wear', image: './assets/baby-frock.png' },
    { id: 14, name: 'Baby T-shirt', price: 250, description: 'Baby wear', image: './assets/baby-tshirt.png' },
    { id: 15, name: 'Baby Short', price: 250, description: 'Baby wear', image: './assets/baby-short.png' },
    { id: 16, name: 'Baby Pajama', price: 250, description: 'Baby wear', image: './assets/baby-pajama.png' },
    { id: 17, name: 'Curtains', price: 250, description: 'Household items', image: './assets/curtains.png' },
    { id: 18, name: 'Bedsheets', price: 250, description: 'Household items', image: './assets/bedsheets.png' },
    { id: 19, name: 'Table Clothe', price: 250, description: 'Household items', image: './assets/tablecloth.png' },
    { id: 20, name: 'Scarf', price: 250, description: 'Household items', image: './assets/scarf.png' },
    { id: 21, name: 'Gloves', price: 250, description: 'Household items', image: './assets/gloves.png' },
    { id: 22, name: 'Winter wear', price: 250, description: 'Household items', image: './assets/winterwear.png' }
  ];

 

  getItems(): Item[] {
    return this.items;
  }

  getItemById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }

   getDeleteItem(id: string = this.TEST_ITEM_ID): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.baseUrl}/orders/${id}`);
}

}
