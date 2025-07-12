import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerAddress } from 'src/app/models/order-models/customerAddress.model';
import { CustomerService } from '../../../services/order-services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-address-popup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customer-address-popup.component.html',
  styleUrl: './customer-address-popup.component.css',
})
export class CustomerAddressPopupComponent implements OnInit {
  @Input() customerId!: string;
  @Input() address: CustomerAddress = {} as CustomerAddress;
  @Input() loading = false;
  @Input() error: string | null = null;

  @Output() confirmOrder = new EventEmitter<CustomerAddress>();
  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

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

  onConfirmOrder() {
    this.confirmOrder.emit(this.address);
  }
}
