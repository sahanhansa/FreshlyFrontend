import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BasketService } from '../../../services/basket.service';
import { ToastService } from '../../../services/toast.service';
import { TemporaryOrderSummary } from '../../../models/basket.model';
import { PickupSchedulerComponent } from '../pickup-scheduler/pickup-scheduler.component';
import { CustomerAddress } from '../../../models/order-models/customerAddress.model';
import { CustomerAddressPopupComponent } from '../customer-address-popup/customer-address-popup.component';
import { OrderConfirmPopupComponent } from '../order-confirm-popup/order-confirm-popup.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    PickupSchedulerComponent,
    CustomerAddressPopupComponent,
    OrderConfirmPopupComponent
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  // Only backend-driven input
  @Input() orderSummary: TemporaryOrderSummary | null = null;

  @Output() deleteOrderEvent = new EventEmitter<string>();
  @Output() refreshOrdersEvent = new EventEmitter<void>();

  orderItems: any[] = [];
  showDeleteConfirmation: boolean = false;
  isProcessing: boolean = false;
  showPickupScheduler: boolean = false;
  showAddressPopup: boolean = false;
  showOrderConfirmPopup: boolean = false;
  showOrderConfirmedPopup: boolean = false;
  customerId = 'a4dca9b3-5f58-11f0-8064-0022481a06a0'; // get this from auth/session

  pickupDateTime!: Date;
  address!: CustomerAddress;
  orderId: string = '';
  laundryName: string = '';
  laundryId: string = '';

  constructor(
    private basketService: BasketService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    // Use only the orderSummary input
    if (this.orderSummary) {
      this.orderItems = this.orderSummary.items.map(item => ({
        itemId: item.itemId,
        name: item.itemName,
        serviceId: item.serviceId,
        washMethod: item.serviceName,
        price: item.price,
        quantity: item.quantity,
        image: item.itemImageUrl || 'assets/default.png'
      }));
      this.orderId = this.orderSummary.temporaryOrderId;
      this.laundryName = this.orderSummary.laundryName;
      if (this.orderSummary.laundryId) {
        this.laundryId = this.orderSummary.laundryId;
      }
    } else {
      this.orderItems = [];
    }
  }

  get total(): number {
    if (this.orderSummary) {
      return this.orderSummary.totalAmount;
    }
    return 0;
  }

  deleteOrder() {
    this.showDeleteConfirmation = true;
  }

  confirmDelete() {
    const id = this.orderSummary?.temporaryOrderId || this.orderId;
    if (!id) return;

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
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  placeOrder() {
    this.showPickupScheduler = true;
  }

  onPickupConfirm(dt: Date) {
    this.pickupDateTime = dt;
    this.showPickupScheduler = false;
    this.showAddressPopup = true;
  }

  onAddressNext(addr: CustomerAddress) {
    this.address = addr;
    this.showAddressPopup = false;
    this.showOrderConfirmPopup = true;
  }

  onOrderConfirm() {
    this.showOrderConfirmPopup = false;
    this.showOrderConfirmedPopup = true;
  }

  onOrderConfirmedClose() {
    this.showOrderConfirmedPopup = false;
    // Optionally, navigate or refresh
  }

  onAddressBack() {
    this.showAddressPopup = false;
    this.showPickupScheduler = true;
  }

  onOrderBack() {
    this.showOrderConfirmPopup = false;
    this.showAddressPopup = true;
  }

  onOrderCancel() {
    this.showOrderConfirmPopup = false;
  }

  deleteItem(itemId: string, serviceId: string) {
    const temporaryOrderId = this.orderSummary?.temporaryOrderId;
    if (!temporaryOrderId) return;

    this.basketService.deleteItemFromOrder(temporaryOrderId, itemId, serviceId).subscribe({
      next: () => {
        this.orderItems = this.orderItems.filter(i => !(i.itemId === itemId && i.serviceId === serviceId));
        if (this.orderSummary) {
          this.orderSummary.items = this.orderSummary.items.filter(i => !(i.itemId === itemId && i.serviceId === serviceId));
          this.orderSummary.totalAmount = this.orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        }
        this.toastService.show('Success', 'Item removed from order', 'success');
      },
      error: (error) => {
        this.toastService.show('Error', 'Failed to remove item', 'error');
        console.error('Delete item error:', error);
      }
    });
  }
}
