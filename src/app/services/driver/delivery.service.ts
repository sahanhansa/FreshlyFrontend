import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interface representing a single item in an order
export interface OrderItems {
  itemName: string;
  quantity: number;
}

// Interface representing the structure of a delivery order
export interface DeliveryOrder {
  id: string;
  status: string;
  customerName: string;
  customerId: string;
  address: string;
  contact: string;
  laundryName: string;
  detailsLink: string;
  orderItems: string[];       // Array of item names (can be extended to use OrderItems[])
  paymentMethod: string;
  deliverDriver?: string;
  note?:string;
}

@Injectable({
  providedIn: 'root' // Makes the service available throughout the application
})
export class DeliveryService {
  // Base URL for the backend API
  private baseUrl = `${environment.apiUrl}/api/Order`;

  constructor(private http: HttpClient) { }

  // Fetch all delivery orders from the backend API
  getAllDeliveries(): Observable<DeliveryOrder[]> {
    const url = `${this.baseUrl}/GetAllDeliveries`;

    return this.http.get<any>(url).pipe(
      map(data => {
        // Ensure response is treated as an array
        const arrayData = Array.isArray(data) ? data : [data];
        console.log('Deliveries received:', arrayData);
        // Convert each raw object to DeliveryOrder type
        return arrayData.map(order => this.mapToDeliveryOrder(order));
      }),
      catchError(error => {
        // Log any error and return an empty array
        console.error('Error fetching deliveries:', error.message || error);
        return of([]);
      })
    );
  }

  // Fetch delivery order details by ID
  getDeliveryById(orderId: string): Observable<DeliveryOrder | null> {
    const url = `${this.baseUrl}/GetAllDeliveries/${orderId}`;

    return this.http.get<any>(url).pipe(
      // Map raw response to DeliveryOrder object
      map(order => this.mapToDeliveryOrder(order)),
      catchError(error => {
        // Log and handle any error
        console.error('Error fetching delivery by ID:', error.message || error);
        return of(null); // Return null if error occurs
      })
    );
  }

  // Convert backend response to DeliveryOrder structure
  private mapToDeliveryOrder(order: any): DeliveryOrder {
    return {
      id: order.orderId,
      status: order.status,
      customerName: order.customerName,
      customerId: order.customerId,
      address: order.address,
      // Combine multiple contact numbers if it's an array
      contact: Array.isArray(order.contact) ? order.contact.join(', ') : order.contact,
      laundryName: order.laundryName,
      // Ensure orderItems is an array; fallback to empty array if not
      orderItems: Array.isArray(order.orderItems) ? order.orderItems : [],
      paymentMethod: order.paymentMethod,
      // Link to the frontend delivery order details page
      detailsLink: `/deliveries-pending-order-details/${order.orderId}`,
      deliverDriver: order.deliverDriver,
      note: order.note || '' 
    };
  }

  MarksToTakeDeliver(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/MarksToLaundryTake`; // PATCH endpoint URL
    const driverId = localStorage.getItem('userId') || '';

    const body = {
      orderId: orderId,
      driverId: driverId
    };
    console.log('MarksToTake body:', body); // Debugging log

    return this.http.patch<any>(url, body).pipe(
      catchError(error => {
        console.error('Error in MarksToTake:', error);
        return of(null);
      })
    );
  }
   MarksToPickDeliver(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/MarksToLaundryPick`; 

    const body = {
      orderId: orderId,
    };
    console.log('MarksToTake body:', body); // Debugging log

    return this.http.patch<any>(url, body).pipe(
      catchError(error => {
        console.error('Error in MarksToLaundryPick:', error);
        return of(null);
      })
    );
  }

     MarksToCustomerDeliver(orderId: string,note:string): Observable<any> {
    const url = `${this.baseUrl}/MarksToCustomerDeliver`; 

    const body = {
      orderId: orderId,
      note:note
    };
    console.log('MarksToTake body:', body); // Debugging log

    return this.http.patch<any>(url, body).pipe(
      catchError(error => {
        console.error('Error in MarksToCustomerDeliver:', error);
        return of(null);
      })
    );
  }

}
