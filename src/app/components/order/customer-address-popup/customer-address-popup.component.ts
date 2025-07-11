import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerAddress } from '../../../models/order-models/customerAddress.model';
import { CustomerService } from '../../../services/order-services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-address-popup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customer-address-popup.component.html'
})
export class CustomerAddressPopupComponent implements OnInit {
  @Input() customerId!: string;
  @Output() next = new EventEmitter<CustomerAddress>();
  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  address: CustomerAddress = {
    addressId: '',
    houseNo: '',
    street: '',
    city: '',
    postalCode: ''
  };
  loading = true;
  error = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    if (this.customerId) {
      this.customerService.getCustomerAddress(this.customerId).subscribe({
        next: (addr) => {
          this.address = addr;
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load address.';
          this.loading = false;
        }
      });
    }
  }

  onNext() {
    this.next.emit(this.address);
  }
}
