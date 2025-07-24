import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToPayOrderCardComponent } from '../to-pay-order-card/to-pay-order-card.component';
import { OrderDetailService } from '../../../services/order-services/order-detail.service';
import { OrderDetailsDTO, OrderItemDTO } from '../../../models/order-models/order-detail.model';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { BasketService } from '../../../services/basket.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { error } from 'console';

declare var payhere: any;
interface SimplifiedItem {
  name: string;
  quantity: number;
}



@Component({
  selector: 'app-to-pay-order-list',
  standalone: true,
  imports: [CommonModule, ToPayOrderCardComponent],
  templateUrl: './to-pay-order-list.component.html',
  styleUrl: './to-pay-order-list.component.css'
})
export class ToPayOrderListComponent implements OnInit {
  toPayOrders: OrderDetailsDTO[] = [];
  displayOrders: {
    orderId: string;
    orderIdFormatted: string;
    laundryName: string;
    date: string;
    totalAmount: number;
    items: SimplifiedItem[];
  }[] = [];
  isLoading = true;
  error: string | null = null;
  userDetails: any = {};

  constructor(
    private http: HttpClient,
    private orderDetailService: OrderDetailService,
    private toastService: ToastService,
    private router: Router,
    private basketService: BasketService
  ) { }

  ngOnInit(): void {
    this.loadToPayOrders();
    this.userDetails = {
      username: localStorage.getItem('username'),
      userId: localStorage.getItem('userId'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      houseNo: localStorage.getItem('houseNo'),
      street: localStorage.getItem('street'),
      city: localStorage.getItem('city'),
      postalCode: localStorage.getItem('postalCode'),
      profileImage: localStorage.getItem('profileImage'),
      contactNumbers: JSON.parse(localStorage.getItem('contactNumbers') || '[]')
    };
  }

  loadToPayOrders(): void {
    this.isLoading = true;
    this.error = null;

    // Get customer ID from BasketService
    const customerId = this.basketService.getCustomerId();
    if (!customerId) {
      this.error = 'You need to be logged in to view your orders';
      this.isLoading = false;
      this.toastService.show('Error', 'Please log in to view your orders', 'error');
      this.router.navigate(['/cus-login']);
      return;
    }

    this.orderDetailService.getOutForDeliveryOrders(customerId).subscribe({
      next: (orders) => {
        this.toPayOrders = orders;
        // Transform the orders for display
        this.displayOrders = orders.map(order => ({
          orderId: order.orderId,
          orderIdFormatted: order.orderIdFormatted,
          laundryName: order.laundryName,
          date: order.orderDateFormatted,
          totalAmount: order.totalAmount,
          items: order.items.map(item => ({
            name: item.itemName,
            quantity: item.quantity
          }))
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to load orders that need payment';
        this.isLoading = false;
        console.error('Error loading to-pay orders:', err);
      }
    });
  }

  initiatePayment(orderId: string, amount: number, items: SimplifiedItem[]): void {
    // This would typically   // Replace dynamically if needed

    const itemsDescription = items.map(i => `${i.name} x${i.quantity}`).join(', ');
    // Call backend to get hash + merchant_id
    this.http.post<any>(`${environment.apiUrl}/api/Payment/generate-hash`, {
      orderId: orderId,
      amount: amount,
      description: itemsDescription,
      firstName: this.userDetails.firstName || 'Guest',
      lastName: this.userDetails.lastName || '',
      email: this.userDetails.email || 'guest@example.com',
      phone: this.userDetails.contactNumbers[0] || '0712345678',
      address: `${this.userDetails.houseNo || ''} ${this.userDetails.street || ''}`,
      city: this.userDetails.city || 'Colombo'
    }).subscribe(res => {
      const payment = {
        sandbox: true,
        merchant_id: res.merchantId,
        return_url: 'http://localhost:4200/payment-success',
        cancel_url: 'http://localhost:4200/payment-cancel',
        notify_url: 'https://your-backend.com/api/payment/payhere/notify',
        order_id: orderId,
        items: itemsDescription,
        amount: res.amount,
        currency: res.currency,
        hash: res.hash,
        first_name: this.userDetails.firstName || 'Guest',
        last_name: this.userDetails.lastName || '',
        email: this.userDetails.email || 'guest@example.com',
        phone: this.userDetails.contactNumbers[0] || '0712345678',
        address: `${this.userDetails.houseNo || ''} ${this.userDetails.street || ''}`,
        city: this.userDetails.city || 'Colombo',
        country: 'Sri Lanka'
      };

      // Setup PayHere event handlers
      payhere.onCompleted =  (orderId: string)=> {
        console.log('Order payment status updated.',orderId);
        this.http.post(`${environment.apiUrl}/api/Basic/ConfirmPayment`, { orderId: orderId }).subscribe({
          next: () => {
            console.log('Order payment status updated.');
            this.toastService.show('Success', 'Payment confirmed and order updated', 'success');
          },
          
          
        });
      };

      payhere.onDismissed = function () {
        console.log('Payment dismissed');
      };

      payhere.onError = function (error: string) {
        console.error('Error:' + error);
      };

      payhere.startPayment(payment);
    });
    // Implement actual payment logic here
  }
}