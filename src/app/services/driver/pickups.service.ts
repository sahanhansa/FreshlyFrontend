import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItem {
  itemName: string;
  quantity: number;
}

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
  pickupDriverId?: string;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PickupsService {
  private baseUrl = `${environment.apiUrl}/api/Order`;

  constructor(private http: HttpClient) {}

  // ✅ Get ALL pickups
  getAllPickups(): Observable<PickupOrder[]> {
    const url = `${this.baseUrl}/GetAllPickups`;

    return this.http.get<any>(url).pipe(
      map(data => {
        const arrayData = Array.isArray(data) ? data : [data];
        console.log('Pickups received:', arrayData);
        return arrayData.map(order => this.mapToPickupOrder(order));
      }),
      catchError(error => {
        // ✅ This logs FULL error details:
        console.error('Error fetching all pickups:');
        console.error('Status:', error.status);
        console.error('Status Text:', error.statusText);
        console.error('Response Body:', error.error);
        console.error('Full Error:', error);

        return of([]); // fallback
      })
    );
  }

  // ✅ Get ONE pickup by ID
  getPickupById(orderId: string): Observable<PickupOrder | null> {
    const url = `${this.baseUrl}/GetAllPickups/${orderId}`;

    return this.http.get<any>(url).pipe(
      map(order => this.mapToPickupOrder(order)),
      catchError(error => {
        console.error('Error fetching pickup by ID:');
        console.error('Status:', error.status);
        console.error('Status Text:', error.statusText);
        console.error('Response Body:', error.error);
        console.error('Full Error:', error);

        return of(null); // fallback
      })
    );
  }

   // ✅ servicd call MarksToTake
MarksToTake(orderId: string): Observable<any> {
  const url = `${this.baseUrl}/MarksToTake`; // PATCH endpoint URL
  const driverId = localStorage.getItem('userId') || '';

  const body = {
    orderId: orderId,
    driverId: driverId
  };

  return this.http.patch<any>(url, body).pipe(
    catchError(error => {
      console.error('Error in MarksToTake:', error);
      return of(null);
    })
  );
}

MarksToDelivered(orderId: string, note:any): Observable<any> {
  const url = `${this.baseUrl}/MarksToDeliver`; // PATCH endpoint URL
  const driverId = localStorage.getItem('userId') || '';
  const body = {
    orderId: orderId,
    driverId:driverId,
    note: note
  }; // Debugging log
console.log('MarksToDelivered body:', body); // Debugging log
  return this.http.patch<any>(url, body).pipe(
    catchError(error => {
      console.error('Error in MarksToDelivered:', error);
      return of(null);
    })
  );
}

  private mapToPickupOrder(order: any): PickupOrder {
    return {
      id: order.orderId,
      status: order.status,
      customerName: order.customerName,
      customerId: order.customerId,
      address: order.address,
      pickupDriverId:order.pickupDriverId,
      contact: Array.isArray(order.contact) ? order.contact.join(', ') : order.contact,
      laundryName: order.laundryName,
      orderItems: Array.isArray(order.orderItems) ? order.orderItems : [],
      detailsLink: `/order-details-pending/${order.orderId}`,
      note: order.note || ''
    };
  }
}
