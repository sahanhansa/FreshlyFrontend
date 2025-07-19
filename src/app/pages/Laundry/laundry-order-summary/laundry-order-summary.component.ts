import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LaundryItem {
  id: number;
  name: string;
  pricePerUnit: number;
  quantity: number;
  status: string;
  imageUrl?: string;

  added?: boolean;
  rejected?: boolean;

  addDetails?: {
    reason: string;
    name: string;
    mobile: string;
    date: Date;
  };

  rejectDetails?: {
    reason: string;
    name: string;
    mobile: string;
    date: Date;
  };
}

@Component({
  selector: 'app-laundry-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laundry-order-summary.component.html',
})
export class LaundryOrderSummaryComponent {
  laundryItems: LaundryItem[] = [
    {
      id: 1,
      name: 'Shirt',
      pricePerUnit: 5,
      quantity: 2,
      status: 'pending',
      imageUrl: '',
    },
    {
      id: 2,
      name: 'Trousers',
      pricePerUnit: 7,
      quantity: 1,
      status: 'pending',
      imageUrl: '',
    },
  ];

  showForm = false;
  formAction: 'increase' | 'decrease' | null = null;
  selectedItem: LaundryItem | null = null;

  formData = {
    reason: '',
    name: '',
    mobile: '',
    date: '',
    time: ''
  };

  openForm(item: LaundryItem, action: 'increase' | 'decrease') {
    this.selectedItem = item;
    this.formAction = action;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].slice(0, 5);
    this.formData = {
      reason: '',
      name: '',
      mobile: '',
      date: dateStr,
      time: timeStr
    };
    this.showForm = true;
  }

  submitForm() {
    if (!this.selectedItem || !this.formAction) return;

    const dateTime = new Date(`${this.formData.date}T${this.formData.time}`);

    if (this.formAction === 'increase') {
      this.selectedItem.quantity += 1;
      this.selectedItem.added = true;
      this.selectedItem.rejected = false;
      this.selectedItem.addDetails = {
        reason: this.formData.reason,
        name: this.formData.name,
        mobile: this.formData.mobile,
        date: dateTime,
      };
      this.selectedItem.rejectDetails = undefined;
    } else if (this.formAction === 'decrease' && this.selectedItem.quantity > 0) {
      this.selectedItem.quantity -= 1;
      this.selectedItem.rejected = true;
      this.selectedItem.added = false;
      this.selectedItem.rejectDetails = {
        reason: this.formData.reason,
        name: this.formData.name,
        mobile: this.formData.mobile,
        date: dateTime,
      };
      this.selectedItem.addDetails = undefined;
    }

    this.closeForm();
  }

  closeForm() {
    this.showForm = false;
    this.selectedItem = null;
    this.formAction = null;
  }
}
