import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentRequest {
  merchantId: string;
  itemNumber: string;
  amount: number;
  currency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  orderId: string;
  cancelUrl: string;
  notifyUrl: string;
  returnUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  paymentData: any;
  paymentUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7276/api/payment';

  constructor(private http: HttpClient) {}

  initiatePayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    // Log the payment request for debugging
    console.log('Initiating payment with data:', paymentData);
    return this.http.post<PaymentResponse>(`${this.apiUrl}/initiate`, paymentData);
  }

  redirectToPayHere(paymentData: any, paymentUrl: string): void {
    // Use paymentData directly from backend response
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paymentUrl;

    Object.keys(paymentData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });
    console.log('Redirecting to PayHere with data:', form);

    
    // document.body.appendChild(form);
    // form.submit();
  }
}
