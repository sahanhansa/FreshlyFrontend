import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // You might need to adjust the port or path
  private apiUrl = 'http://localhost:5027';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    // Adjust endpoint to match your actual API endpoint
    return this.http.get<Item[]>(`${this.apiUrl}/api/Item/GetItemsWithServices`);
    // or maybe it's: return this.http.get<Item[]>(`${this.apiUrl}/Items/GetItemsWithServices`);
  }
}
