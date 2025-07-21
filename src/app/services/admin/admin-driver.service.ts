import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Address {
  addressId?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Driver {
  driverId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  vehicleNumber: string;
  address?: Address;
  profileImageUrl?: string;
  isActive?: boolean;
  dateJoined?: string;
  bankDetails?: {
    bankName: string;
    branch: string;
    accountNo: string;
  };
  recentOrders?: Order[];
}

export interface Order {
  orderId: string;
  date: string;
  status: string;
  driverId: string;
  laundryId: string;
  items: OrderItem[];
  subtotal: number;
  isExpanded?: boolean;
}

export interface OrderItem {
  item: string;
  process: string;
  clotheType: string;
  count: number;
  pricePerItem: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDriverService {
  private apiUrl = `${environment.apiUrl}/api/Driver`;

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  addDriver(formData: FormData): Observable<Driver> {
    // Send FormData directly for multipart/form-data (file upload)
    return this.http.post<Driver>(this.apiUrl, formData);
  }

  getDriverById(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`);
  }

  createDriver(driver: Omit<Driver, 'driverId'>): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  updateDriver(id: string, driver: Partial<Driver>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, driver);
  }

  deleteDriver(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  removeDriver(driverId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${driverId}/remove`, {});
  }

  restoreDriver(driverId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${driverId}/restore`, {});
  }

  // This is for mock data until you implement this endpoint in your backend
  getDriverOrders(driverId: string): Observable<Order[]> {
    // Simulate an API call with mock data
    const mockOrders: Order[] = [
      {
        orderId: '#04',
        date: '18/12/2024',
        status: 'Processing',
        driverId: driverId,
        laundryId: '234',
        items: [
          { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
          { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
          { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
          { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
        ],
        subtotal: 1800
      }
    ];
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockOrders);
        observer.complete();
      }, 500);
    });
  }
}
