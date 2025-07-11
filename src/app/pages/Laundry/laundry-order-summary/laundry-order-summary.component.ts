import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  pricePerUnit: number;
  service: string;
  status: string;
  rejected: boolean;
}

@Component({
  selector: 'app-laundry-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laundry-order-summary.component.html',
  styleUrls: ['./laundry-order-summary.component.scss']
})
export class LaundryOrderSummaryComponent {
  services = ['Regular Wash', 'Dry Clean', 'Hand Wash', 'Press Only'];
  statuses = ['Processing', 'Finished'];

  items: Item[] = [
    { id: 1, name: 'Shirt', imageUrl: 'assets/shirt.png', quantity: 3, pricePerUnit: 100, service: 'Regular Wash', status: 'Processing', rejected: false },
    { id: 2, name: 'T-Shirt', imageUrl: 'assets/tshirt.png', quantity: 2, pricePerUnit: 80, service: 'Dry Clean', status: 'Processing', rejected: false },
    { id: 3, name: 'Jeans', imageUrl: 'assets/jeans.png', quantity: 1, pricePerUnit: 150, service: 'Hand Wash', status: 'Processing', rejected: false },
    { id: 4, name: 'Shirt', imageUrl: 'assets/shirt.png', quantity: 1, pricePerUnit: 100, service: 'Regular Wash', status: 'Processing', rejected: true },
    { id: 5, name: 'Jacket', imageUrl: 'assets/jacket.png', quantity: 1, pricePerUnit: 200, service: 'Press Only', status: 'Processing', rejected: false },
    { id: 6, name: 'T-Shirt', imageUrl: 'assets/shirt.png', quantity: 1, pricePerUnit: 100, service: 'Regular Wash', status: 'Processing', rejected: false },
  ];

  getItemsByService(service: string) {
    return this.items.filter(i => i.service === service && !i.rejected);
  }

  getRejectedItemsByService(service: string) {
    return this.items.filter(i => i.service === service && i.rejected);
  }

  getTotalPrice() {
    return this.items
      .filter(i => !i.rejected)
      .reduce((sum, i) => sum + i.quantity * i.pricePerUnit, 0);
  }

  updateStatus(item: Item, event: Event) {
    const select = event.target as HTMLSelectElement;
    item.status = select.value;
  }

  getStatusColor(status: string): string {
    return status === 'Finished' ? 'text-green-600' : 'text-orange-600';
  }
}
