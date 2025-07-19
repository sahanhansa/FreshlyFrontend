import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define types for the order status to match your backend values
export type OrderStatusStep = 
  'Order placed' | 
  'Order pickup scheduled' | 
  'Order picked up' | 
  'Processing in laundry' | 
  'Finished processing' | 
  'Out for delivery' | 
  'Delivered';

export interface OrderDetails {
  id: string;
  laundryName: string;
  date: string; 
  totalAmount: number;
  items: {
    name: string;
    quantity: number;
  }[];
  status: 'ongoing' | 'completed'; 
  currentStep: OrderStatusStep; 
}

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent {
  @Input() visible: boolean = false;
  @Input() order: OrderDetails | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<string>();
  
  // Define all possible order status steps
  orderStatusSteps: OrderStatusStep[] = [
    'Order placed',
    'Order pickup scheduled',
    'Order picked up',
    'Processing in laundry',
    'Finished processing',
    'Out for delivery',
    'Delivered'
  ];
  
  closeModal(): void {
    this.close.emit();
  }
  
  cancelOrder(): void {
    if (this.order) {
      this.cancel.emit(this.order.id);
    }
  }
  
  canCancelOrder(): boolean {
    if (!this.order) return false;
    return this.order.currentStep === 'Order placed';
  }
  
  isStepCompleted(step: string): boolean {
    if (!this.order) return false;
    
    const currentStepIndex = this.orderStatusSteps.indexOf(this.order.currentStep as OrderStatusStep);
    const stepIndex = this.orderStatusSteps.indexOf(step as OrderStatusStep);
    
    return stepIndex <= currentStepIndex;
  }
  
  isCurrentStep(step: string): boolean {
    return this.order?.currentStep === step;
  }
  
  getEstimatedDeliveryDate(): string {
    if (!this.order) return '';
    
    try {
      // Parse the order date (assuming format like "15 July 2025")
      const dateParts = this.order.date.split(' ');
      const day = parseInt(dateParts[0]);
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      const month = monthNames.indexOf(dateParts[1]);
      const year = parseInt(dateParts[2]);
      
      if (isNaN(day) || month === -1 || isNaN(year)) {
        return 'In about a week';
      }
      
      // Create date object and add 7 days
      const orderDate = new Date(year, month, day);
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(orderDate.getDate() + 7);
      
      // Format the delivery date
      const deliveryDay = deliveryDate.getDate();
      const deliveryMonth = monthNames[deliveryDate.getMonth()];
      const deliveryYear = deliveryDate.getFullYear();
      
      return `${deliveryDay} ${deliveryMonth} ${deliveryYear}`;
    } catch (error) {
      return 'In about a week';
    }
  }
  
  isDeliveryToday(): boolean {
    if (!this.order) return false;
    return this.order.currentStep === 'Out for delivery';
  }
}