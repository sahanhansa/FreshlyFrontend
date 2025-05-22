import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

// Interface to define the structure of a single ordered item
export interface OrderItem {
  itemName: string;
  quantity: number;
}

// Interface to define the structure of a pickup order
export interface PickupOrder {
  id: string;
  status: string;
  customerName: string;
  customerId: string;
  address: string;
  contact: string;
  laundryName: string;
  orderItems: OrderItem[];
  detailsLink: string;
}

@Injectable({
  providedIn: 'root' // Makes this service available app-wide
})
export class PickupsService {
  // Base URL of the backend API
  private baseUrl = 'https://localhost:7276/api/Order';

  constructor(private http: HttpClient) {}

  // Fetch all pickup orders from the API
  getAllPickups(): Observable<PickupOrder[]> {
    const url = `${this.baseUrl}/GetAllPickups`;

    return this.http.get<any>(url).pipe(
      map(data => {
        // Ensure data is treated as an array
        const arrayData = Array.isArray(data) ? data : [data];

        // Convert each item to a PickupOrder object
        return arrayData.map(order => this.mapToPickupOrder(order));
      }),
      catchError(error => {
        // Handle and log errors gracefully
        console.error('Error fetching all pickups:', error.message || error);
        return of([]); // Return empty array on error
      })
    );
  }

  // Fetch a single pickup order by orderId
  getPickupById(orderId: string): Observable<PickupOrder | null> {
    const url = `${this.baseUrl}/GetAllPickups/${orderId}`;

    return this.http.get<any>(url).pipe(
      map(order => this.mapToPickupOrder(order)), // Convert response to PickupOrder
      catchError(error => {
        // Log and handle errors
        console.error('Error fetching pickup by ID:', error.message || error);
        return of(null); // Return null on error
      })
    );
  }

  // Utility method to map raw API data to a PickupOrder object
  private mapToPickupOrder(order: any): PickupOrder {
    return {
      id: order.orderId,
      status: order.status,
      customerName: order.customerName,
      customerId: order.customerId,
      address: order.address,
      // Join multiple contact numbers into a single string if needed
      contact: Array.isArray(order.contact) ? order.contact.join(', ') : order.contact,
      laundryName: order.laundryName,
      // Ensure orderItems is an array
      orderItems: Array.isArray(order.orderItems) ? order.orderItems : [],
      // Link for navigation in the frontend UI
      detailsLink: `/order-details-pending/${order.orderId}`
    };
  }
}
