import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

// Define AdminOrderDTO to match the backend response
export interface AdminOrderDTO {
  orderId: string;
  placedDate: string | null;
  customerFName?: string;
  customerLName?: string;
  statusName?: string;
  totalCost: number;
  customer?: {
    firstName: string;
    lastName: string;
    // Add other customer fields if needed
  };
  status?: {
    statusDisplayName: string;
    // Add other status fields if needed
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private apiUrl = `${environment.apiUrl}/api/Order`;
  
  constructor(private http: HttpClient) {
    console.log('AdminOrderService initialized with API URL:', this.apiUrl);
  }
  
  /**
   * Get all orders for admin view
   */
  getOrders(): Observable<AdminOrderDTO[]> {
    return this.http.get<AdminOrderDTO[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching orders:', error);
        
        // For development purposes only - return mock data if the API fails
        if (error.status === 404 || error.status === 0) {
          console.warn('API endpoint not found, using mock data');
          return of(this.getMockOrders());
        }
        
        return this.handleError('Failed to fetch orders')(error);
      })
    );
  }

  /**
   * Get a specific order by ID
   */
  getOrder(id: string): Observable<AdminOrderDTO> {
    return this.http.get<AdminOrderDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError(`Failed to fetch order with ID ${id}`))
    );
  }
  
  /**
   * Error handler
   */
  private handleError(message: string) {
    return (error: any): Observable<never> => {
      console.error(message, error);
      return throwError(() => new Error(`${message}: ${error.message}`));
    };
  }
  
  /**
   * Mock data for development/testing purposes
   * This should be removed in production
   */
  private getMockOrders(): AdminOrderDTO[] {
    return [
      {
        orderId: '1001',
        placedDate: '2025-07-01T09:30:00',
        customerFName: 'John',
        customerLName: 'Smith',
        statusName: 'Completed',
        totalCost: 1450
      },
      {
        orderId: '1002',
        placedDate: '2025-07-05T10:45:00',
        customerFName: 'Jane',
        customerLName: 'Doe',
        statusName: 'Processing',
        totalCost: 1200
      },
      {
        orderId: '1003',
        placedDate: '2025-07-08T08:15:00',
        customerFName: 'Robert',
        customerLName: 'Johnson',
        statusName: 'Picked Up',
        totalCost: 1700
      }
    ];
  }
}
