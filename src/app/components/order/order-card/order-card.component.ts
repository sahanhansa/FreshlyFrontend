import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusStep } from '../order-status/order-status.component';
import { OrderItemDTO } from '../../../models/order-models/order-detail.model';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
  @Input() orderId: string = '';
  @Input() laundryName: string = '';
  @Input() date: string = '';
  @Input() items: OrderItemDTO[] = [];
  @Input() totalAmount: number = 0;
  @Input() status: 'ongoing' | 'completed' = 'ongoing';
  @Input() currentStep: OrderStatusStep = 'Order placed';
  
  @Output() orderClicked = new EventEmitter<string>();
  
  // Add missing properties that caused errors
  areItemsVisible = false;
  
  // Method that emits the order ID when the card is clicked
  viewOrderDetails(): void {
    this.orderClicked.emit(this.orderId);
  }
  
  // Add missing method that caused error
  toggleItemsVisibility(event?: Event): void {
    if (event) event.stopPropagation(); // Prevent parent click event
    this.areItemsVisible = !this.areItemsVisible;
  }
  
  // Helper method to check if the order is currently in progress
  isOngoing(): boolean {
    return this.status === 'ongoing';
  }
  
  // Helper method to check if the order is completed
  isCompleted(): boolean {
    return this.status === 'completed' || this.currentStep === 'Completed';
  }

  // Show a maximum of 2 items in the card
  get visibleItems(): OrderItemDTO[] {
    return this.items.slice(0, 2);
  }

  // Check if there are more items beyond the visible ones
  get hasMoreItems(): boolean {
    return this.items.length > 2;
  }

  // Get the count of additional items
  get additionalItemsCount(): number {
    return this.items.length - 2;
  }
}