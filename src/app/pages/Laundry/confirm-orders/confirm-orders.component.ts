import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface OrderSection {
  name: string;
  items: OrderItem[];
  total: number;
}

@Component({
  selector: 'app-confirm-orders',
  standalone: true,
  imports: [CommonModule, RouterLink,FooterComponent],
  templateUrl: './confirm-orders.component.html',
})
export class ConfirmOrdersComponent {
  trackingId = 4621;
  deliveryDate = '20/12/2024';

  sections: OrderSection[] = [
    {
      name: 'Wash',
      items: [
        { id: '01', name: 'Shirt', quantity: 4, unitPrice: 300 },
        { id: '08', name: 'Blouse', quantity: 2, unitPrice: 300 },
        { id: '12', name: 'Trouser', quantity: 3, unitPrice: 400 },
        { id: '22', name: 'Bed Sheet', quantity: 4, unitPrice: 450 },
        { id: '25', name: 'Pillow Case', quantity: 8, unitPrice: 150 },
      ],
      get total() {
        return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      }
    },
    {
      name: 'Dry Clean',
      items: [
        { id: '01', name: 'Shirt', quantity: 4, unitPrice: 300 },
        { id: '08', name: 'Blouse', quantity: 2, unitPrice: 300 },
        { id: '12', name: 'Trouser', quantity: 3, unitPrice: 400 },
        { id: '22', name: 'Bed Sheet', quantity: 4, unitPrice: 450 },
        { id: '25', name: 'Pillow Case', quantity: 8, unitPrice: 150 },
      ],
      get total() {
        return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      }
    },
    {
      name: 'Press',
      items: [
        { id: '01', name: 'Shirt', quantity: 4, unitPrice: 300 },
        { id: '08', name: 'Blouse', quantity: 2, unitPrice: 300 },
        { id: '12', name: 'Trouser', quantity: 3, unitPrice: 400 },
        { id: '22', name: 'Bed Sheet', quantity: 4, unitPrice: 450 },
        { id: '25', name: 'Pillow Case', quantity: 8, unitPrice: 150 },
      ],
      get total() {
        return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      }
    }
  ];

  get totalBill(): number {
    return this.sections.reduce((sum, section) => sum + section.total, 0);
  }

  increaseQuantity(section: OrderSection, item: OrderItem): void {
    item.quantity++;
  }

  decreaseQuantity(section: OrderSection, item: OrderItem): void {
    if (item.quantity > 0) item.quantity--;
  }
}