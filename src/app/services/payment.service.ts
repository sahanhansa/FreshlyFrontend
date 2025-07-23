import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = 'https://localhost:5027/api/payment'; // replace with your backend

  constructor(private http: HttpClient) { }

  createPayHerePayment(order: any) {
    return this.http.post(`${this.apiUrl}/create-payhere-payment`, order);
  }
}
