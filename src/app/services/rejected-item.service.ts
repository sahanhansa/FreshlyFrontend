import { Injectable } from '@angular/core';
//from rohansi
// import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { RejectedItem } from '../models/rejected-item.model';

//from lasini
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { RejectedItem } from '../models/rejected-item.model';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class RejectedItemService {
  private apiUrl = '/api/RejectedItem';
  private apiUrl2 = `${environment.apiUrl}/api/rejecteditem`;

  constructor(private http: HttpClient, private toastService: ToastService) {}

  //lasini
  getRejectedItemsByOrderId(orderId: string): Observable<RejectedItem[]> {
    return this.http.get<RejectedItem[]>(`${this.apiUrl2}/order/${orderId}/rejected-items`)
    //return this.http.get<RejectedItem[]>(`${this.apiUrl}/order/02df4c49-131e-40e4-aed0-8ae6c45cebf5/rejected-items`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching rejected items:', error);
          // Silent error - don't show to user for non-critical feature
          return throwError(() => new Error('Failed to load rejected items'));
        })
      );
  }

  // Get all rejected items
  getRejectedItems(): Observable<RejectedItem[]> {
    return this.http.get<RejectedItem[]>(this.apiUrl);
  }

  // Get a single rejected item by ID
  getRejectedItemById(rejectedItemId: string): Observable<RejectedItem> {
    return this.http.get<RejectedItem>(`${this.apiUrl}/${rejectedItemId}`);
  }

  // Get a single rejected item by laundryId and rejectedItemId
  getRejectedItemByLaundryAndId(laundryId: string, rejectedItemId: string) {
    return this.http.get<RejectedItem>(`${this.apiUrl}/${laundryId}/${rejectedItemId}`);
  }

  // Get all rejected items for a laundry
  getRejectedItemsByLaundryId(laundryId: string) {
    return this.http.get<RejectedItem[]>(`${this.apiUrl}/${laundryId}`);
  }

  // Post a new rejected item
  postRejectedItem(rejectedItem: RejectedItem): Observable<RejectedItem> {
    return this.http.post<RejectedItem>(`${this.apiUrl}/${rejectedItem.rejectedItemId}`, rejectedItem);
  }
}
