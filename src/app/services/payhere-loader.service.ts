import { Injectable } from '@angular/core';

declare var payhere: any;

@Injectable({
  providedIn: 'root'
})
export class PayhereLoaderService {
  private isLoaded = false;
  private loadingPromise: Promise<any> | null = null;

  async initializePayment(): Promise<any> {
    if (this.isLoaded && typeof payhere !== 'undefined') {
      return payhere;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    console.log('Loading PayHere for payment...');
    
    this.loadingPromise = new Promise((resolve, reject) => {
      // Check if PayHere is already loaded
      if (typeof payhere !== 'undefined') {
        this.isLoaded = true;
        resolve(payhere);
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.payhere.lk/lib/payhere.js';
      script.async = true;

      script.onload = () => {
        console.log('PayHere loaded successfully');
        this.isLoaded = true;
        
        // Apply debugger override after PayHere loads
        this.overrideDebugger();
        
        resolve(payhere);
      };

      script.onerror = () => {
        console.error('Failed to load PayHere script');
        this.loadingPromise = null; // Reset so we can try again
        reject(new Error('Failed to load PayHere script'));
      };

      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }

  private overrideDebugger() {
    // Override debugger statements in the loaded PayHere script
    const originalEval = window.eval;
    
    window.eval = function(code: string) {
      if (typeof code === 'string' && code.includes('debugger')) {
        console.warn('PayHere debugger statement blocked');
        return;
      }
      return originalEval.call(this, code);
    };

    // Additional protection
    if (typeof window !== 'undefined') {
      (window as any).debugger = function() {
        console.warn('PayHere debugger statement ignored');
      };
    }
  }

  isPayhereLoaded(): boolean {
    return this.isLoaded && typeof payhere !== 'undefined';
  }

  // Method to start payment - this is what components should call
  async startPayment(paymentData: any): Promise<void> {
    try {
      const payhereInstance = await this.initializePayment();
      
      // Setup PayHere event handlers
      payhereInstance.onCompleted = function(orderId: string) {
        console.log('Payment completed. Order ID:', orderId);
        // Handle payment success
      };

      payhereInstance.onDismissed = function() {
        console.log('Payment dismissed');
        // Handle payment dismissal
      };

      payhereInstance.onError = function(error: string) {
        console.error('Payment error:', error);
        // Handle payment error
      };

      // Start the payment
      payhereInstance.startPayment(paymentData);
      
    } catch (error) {
      console.error('Failed to initialize PayHere payment:', error);
      throw error;
    }
  }
}
