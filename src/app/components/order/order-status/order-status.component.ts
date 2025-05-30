import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
  name: string;
  quantity: number;
}

// Define types for the order status
export type OrderStatusStep = 
  'Order placed' | 
  'Order pickup scheduled' | 
  'Picked up' | 
  'Processing in laundry' | 
  'Finished processing' | 
  'Out for delivery' | 
  'Completed';

// Interface defining the complete order details needed for status display
export interface OrderDetails {
  id: string;
  laundryName: string;
  date: string; 
  totalAmount: number;
  items: OrderItem[];
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
    'Picked up',
    'Processing in laundry',
    'Finished processing',
    'Out for delivery',
    'Completed'
  ];
  
  // Method to close the modal and emit the close event
  closeModal(): void {
    this.close.emit();
  }
  
  // Method to handle order cancellation and emit the cancel event with the order ID
  cancelOrder(): void {
    if (this.order) {
      this.cancel.emit(this.order.id);
      this.closeModal();
    }
  }
  
  // Method to determine if an order can be cancelled based on its current status
  canCancelOrder(): boolean {
    if (!this.order) return false;
    
    const cancelableStatuses: OrderStatusStep[] = ['Order placed', 'Order pickup scheduled'];
    return cancelableStatuses.includes(this.order.currentStep as OrderStatusStep);
  }
  
  // Helper methods for status timeline
  isStepCompleted(step: string): boolean {
    if (!this.order) return false;
    
    const currentStepIndex = this.orderStatusSteps.indexOf(this.order.currentStep as OrderStatusStep);
    const stepIndex = this.orderStatusSteps.indexOf(step as OrderStatusStep);
    
    return stepIndex <= currentStepIndex;
  }
  
  // Checks if a step is the current active step in the process
  isCurrentStep(step: string): boolean {
    return this.order?.currentStep === step;
  }
  
  // Get estimated delivery date (1 week from order date)
  getEstimatedDeliveryDate(): string {
    if (!this.order) return '';
    
    try {
      // Parse the order date
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
  
  // Determines if delivery is expected today
  isDeliveryToday(): boolean {
    if (!this.order) return false;
    
    // If order is in "Out for delivery" status, delivery is today
    return this.order.currentStep === 'Out for delivery';
  }
}