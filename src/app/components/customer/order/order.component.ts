import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCategoryComponent } from '../../order/item-category/item-category.component';
import { ItemCardListComponent } from '../../order/item-card-list/item-card-list.component';
import { LaundryListComponent } from '../../order/laundry-list/laundry-list.component';
import { OrderSummaryComponent } from '../../order/order-summary/order-summary.component';
import { RouterModule } from '@angular/router';

interface LaundryService {
  id: string;
  name: string;
  address: string;
  contact?: string;
}

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
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ItemCategoryComponent,
    ItemCardListComponent,
    LaundryListComponent,
    OrderSummaryComponent
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentStep: number = 1;
  selectedCategory: string = 'Ladies';
  selectedItems: OrderItem[] = [];
  selectedLaundry: LaundryService | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
  onItemsSelected(items: any[]): void {
    // Check if items is an array (from our component) or an Event (from template)
    if (items instanceof Event) {
      // In case the event object is passed directly
      // We would typically extract the data from the event
      // For now, we'll just log and not change the selection
      console.log('Received Event object instead of items array:', items);
      return;
    }
    
    this.selectedItems = items;
    if (items.length > 0) {
      this.currentStep = 2; // Move to laundry selection
    }
  }
  onLaundrySelected(laundry: any): void {
    this.selectedLaundry = laundry;
    this.currentStep = 3; // Move to order summary
  }

  goToNextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  placeOrder(): void {
    // Process the order
    console.log('Order placed', {
      items: this.selectedItems,
      laundry: this.selectedLaundry
    });

    // Navigate to confirmation page or handle next steps
    // You could redirect to a confirmation page or show a success modal
  }
}
