import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentService, PaymentRequest } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      merchantId: ['1231259', Validators.required],
      itemNumber: ['ITEM001', Validators.required],
      amount: [100.00, [Validators.required, Validators.min(0.01)]],
      currency: ['LKR', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['Sri Lanka', Validators.required],
      orderId: ['ORDER12345', Validators.required],
      cancelUrl: ['https://localhost:7276/api/payment/cancel', Validators.required],
      notifyUrl: ['https://localhost:7276/api/payment/notify', Validators.required],
      returnUrl: ['https://d106-45-121-88-32.ngrok-free.app/api/sessions/payment-webhook', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPayHereScript();
  }

  private loadPayHereScript(): void {
    const scriptId = 'payhere-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = 'https://www.payhere.lk/lib/payhere.js';
      document.body.appendChild(script);
    }
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.loading = true;
      this.error = '';

      const paymentData: PaymentRequest = this.paymentForm.value;

      this.paymentService.initiatePayment(paymentData).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            // Redirect to PayHere
            this.paymentService.redirectToPayHere(response.paymentData, response.paymentUrl);
          } else {
            this.error = response.message;
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to initiate payment. Please try again.';
          console.error('Payment error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.paymentForm.controls).forEach(field => {
      const control = this.paymentForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
