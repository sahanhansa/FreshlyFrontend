import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Add Router import
import { BasketService } from '../../../services/basket.service';
import { ToastService } from '../../../services/toast.service';
import { TemporaryOrderSummary, TemporaryOrderItem } from '../../../models/basket.model';

interface OrderItem {
  id: number;
  name: string;
  material: string;
  washMethod: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  // Legacy inputs for backward compatibility
  @Input() orderId: string = '';
  @Input() laundryName: string = '';
  @Input() laundryId: string = ''; // Add laundryId input
  @Input() items: OrderItem[] = [];
  @Input() showLaundryInfo: boolean = true;
  
  // New input for backend data
  @Input() orderSummary: TemporaryOrderSummary | null = null;

  @Output() deleteOrderEvent = new EventEmitter<string>();
  @Output() refreshOrdersEvent = new EventEmitter<void>();

  orderItems: any[] = [];
  showDeleteConfirmation: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private basketService: BasketService,
    private toastService: ToastService,
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    // Use the orderSummary if provided, otherwise fall back to legacy inputs
    if (this.orderSummary) {
      this.orderItems = this.orderSummary.items.map(item => ({
        id: item.itemId,
        name: item.itemName,
        //categoryName: item.categoryName || 'Standard',
        washMethod: item.serviceName,
        price: item.price,
        quantity: item.quantity,
        image: item.itemImageUrl || 'assets/default.png'
      }));
      this.orderId = this.orderSummary.temporaryOrderId;
      this.laundryName = this.orderSummary.laundryName;
      // Extract laundryId from orderSummary if available
      if (this.orderSummary.laundryId) {
        this.laundryId = this.orderSummary.laundryId;
      }
    } else {
      this.orderItems = this.items;
    }
  }

  get total(): number {
    if (this.orderSummary) {
      return this.orderSummary.totalAmount;
    }
    return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  deleteOrder() {
    this.showDeleteConfirmation = true;
  }

  confirmDelete() {
    const id = this.orderSummary?.temporaryOrderId || this.orderId;
    
    if (this.orderSummary) {
      this.isProcessing = true;
      this.basketService.deleteOrder(id).subscribe({
        next: () => {
          this.toastService.show('Success', 'Order deleted successfully', 'success');
          this.showDeleteConfirmation = false;
          this.deleteOrderEvent.emit(id);
          this.isProcessing = false;
        },
        error: (error) => {
          this.toastService.show('Error', 'Failed to delete order', 'error');
          console.error('Delete order error:', error);
          this.showDeleteConfirmation = false;
          this.isProcessing = false;
        }
      });
    } else {
      // Legacy behavior
      console.log(`Order ${this.orderId} deleted`);
      this.showDeleteConfirmation = false;
      this.deleteOrderEvent.emit(this.orderId);
    }
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  placeOrder() {
    const id = this.orderSummary?.temporaryOrderId || this.orderId;
    
    if (this.orderSummary) {
      this.isProcessing = true;
      this.basketService.placeOrder(id).subscribe({
        next: () => {
          this.toastService.show('Success', 'Order placed successfully', 'success');
          this.refreshOrdersEvent.emit();
          this.isProcessing = false;
        },
        error: (error) => {
          this.toastService.show('Error', 'Failed to place order', 'error');
          console.error('Place order error:', error);
          this.isProcessing = false;
        }
      });
    } else {
      // Legacy behavior
      console.log(`Place order: ${this.orderId}`);
    }
  }

  deleteItem(itemId: any) {
    const index = this.orderItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.orderItems.splice(index, 1);
      console.log(`Item with ID ${itemId} removed from order ${this.orderId}`);
    }
  }
}
