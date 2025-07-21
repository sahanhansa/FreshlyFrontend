import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RejectedItem } from '../models/rejected-item.model';

@Injectable({ providedIn: 'root' })
export class RejectedItemService {
  private apiUrl = '/api/RejectedItem';

  constructor(private http: HttpClient) {}

  // Get all rejected items
  getRejectedItems(): Observable<RejectedItem[]> {
    return this.http.get<RejectedItem[]>(this.apiUrl);
  }

  // Get a single rejected item by ID
  getRejectedItemById(rejectedItemId: string): Observable<RejectedItem> {
    return this.http.get<RejectedItem>(`${this.apiUrl}/${rejectedItemId}`);
  }

  // Post a new rejected item
  postRejectedItem(rejectedItem: RejectedItem): Observable<RejectedItem> {
    return this.http.post<RejectedItem>(`${this.apiUrl}/${rejectedItem.rejectedItemId}`, rejectedItem);
  }
} 