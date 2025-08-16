import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerAddress } from 'src/app/models/order-models/customerAddress.model';
import { CustomerService } from '../../../services/order-services/customer.service';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'app-customer-address-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-address-popup.component.html',
  styleUrl: './customer-address-popup.component.css',
})
export class CustomerAddressPopupComponent implements OnInit {
  @Input() customerId: string = '';
  @Input() address: CustomerAddress = {} as CustomerAddress;
  @Input() loading = false;
  @Input() error: string | null = null;

  @Output() confirmOrder = new EventEmitter<CustomerAddress>();
  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  newContactNumber: string = '';

  constructor(
    private customerService: CustomerService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.loading = true;
    const customerId = this.basketService.getCustomerId();
    
    if (customerId) {
      this.customerService.getCustomerAddress(customerId).subscribe({
        next: (addr) => {
          this.address = addr;
          // Ensure contactNumbers is initialized
          if (!this.address.contactNumbers) {
            this.address.contactNumbers = [];
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load address.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Please log in to continue.';
      this.loading = false;
    }
  }

  addEmptyContactNumber() {
    if (!this.address.contactNumbers) {
      this.address.contactNumbers = [];
    }
    
    this.address.contactNumbers.push('');
  }

  addContactNumber() {
    if (!this.newContactNumber.trim()) return;
    
    if (!this.address.contactNumbers) {
      this.address.contactNumbers = [];
    }
    
    // Add number if it doesn't already exist
    if (!this.address.contactNumbers.includes(this.newContactNumber)) {
      this.address.contactNumbers.push(this.newContactNumber);
    }
    
    this.newContactNumber = ''; // Clear the input
  }

  removeContactNumber(index: number) {
    if (this.address.contactNumbers && this.address.contactNumbers.length > index) {
      this.address.contactNumbers.splice(index, 1);
    }
  }

  onConfirmOrder() {
    this.confirmOrder.emit(this.address);
  }
}
