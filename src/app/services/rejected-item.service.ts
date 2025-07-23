import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { RejectedItem } from '../models/rejected-item.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class RejectedItemService {
  private apiUrl = `${environment.apiUrl}/api/rejecteditem`;

  constructor(private http: HttpClient, private toastService: ToastService) {}

  getRejectedItemsByOrderId(orderId: string): Observable<RejectedItem[]> {
    return this.http.get<RejectedItem[]>(`${this.apiUrl}/order/${orderId}/rejected-items`)
    //return this.http.get<RejectedItem[]>(`${this.apiUrl}/order/02df4c49-131e-40e4-aed0-8ae6c45cebf5/rejected-items`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching rejected items:', error);
          // Silent error - don't show to user for non-critical feature
          return throwError(() => new Error('Failed to load rejected items'));
        })
      );
  }
}


