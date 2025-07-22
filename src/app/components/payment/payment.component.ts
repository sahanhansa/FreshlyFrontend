import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import e from 'express';


declare var payhere: any;
@Component({
  selector: 'app-payment-request',
  templateUrl: './payment.component.html'
})
export class PaymentComponent {
  constructor(private http: HttpClient) {}

  pay() {
    const orderId = 'ORDER123';  // Replace dynamically if needed
    const amount = 1000.00;

    // Call backend to get hash + merchant_id
    this.http.post<any>(`${environment.apiUrl}/api/Payment/generate-hash`, {
      orderId: orderId,
      amount: amount,
      description:"Test Payment",
      firstName: 'John',
      lastName: 'Doe',
      email:'test@gmail.com',
      phone: '0712345678',
      address: '123 Street',
      city: 'Colombo'
    }).subscribe(res => {
      const payment = {
        sandbox: true,
        merchant_id: res.merchantId,
        return_url: 'http://localhost:4200/payment-success',
        cancel_url: 'http://localhost:4200/payment-cancel',
        notify_url: 'https://your-backend.com/api/payment/payhere/notify',
        order_id: orderId,
        items: 'Test Item',
        amount: res.amount,
        currency: res.currency,
        hash: res.hash,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '0712345678',
        address: '123 Street',
        city: 'Colombo',
        country: 'Sri Lanka'
      };

      // Setup PayHere event handlers
      payhere.onCompleted = function(orderId: string) {
        console.log('Payment completed. OrderID:' + orderId);
        // Redirect or show success message
      };

      payhere.onDismissed = function() {
        console.log('Payment dismissed');
      };

      payhere.onError = function(error: string) {
        console.error('Error:' + error);
      };

      payhere.startPayment(payment);
    });
  }
}
