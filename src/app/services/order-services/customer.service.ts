import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerAddress } from '../../models/order-models/customerAddress.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/api/Customer`;

  constructor(private http: HttpClient) {}

  getCustomerAddress(customerId: string): Observable<CustomerAddress> {
  return this.http.get<CustomerAddress>(`${environment.apiUrl}/api/Order/Customer/${customerId}/address`);
}
}
