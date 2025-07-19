import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CompleteTasksDetailsDto {
  orderId: string;
  customerId?: string;
  customerName: string;
  address?: string;
  laundryName?: string;
  status: string;
  contact?: string[];
}

@Component({
  selector: 'app-complete-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let task of paginatedTasks">
      <div class="order-card">
        <div><strong>Order ID:</strong> {{task.orderId}}</div>
        <div><strong>Customer Name:</strong> {{task.customerName}}</div>
        <div><strong>Status:</strong> {{task.status}}</div>
        <!-- Add more fields as needed -->
      </div>
    </div>
  `,
  styleUrls: ['./complete-order-list.component.css']
})
export class CompleteOrderListComponent implements OnChanges {
  @Input() tasks: CompleteTasksDetailsDto[] = [];
  @Input() searchQuery: string = '';
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Output() totalItemChange = new EventEmitter<number>();

  filteredTasks: CompleteTasksDetailsDto[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Filter tasks by searchQuery
    this.filteredTasks = this.tasks.filter(task =>
      !this.searchQuery ||
      task.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      task.orderId.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    // Emit total item count
    this.totalItemChange.emit(this.filteredTasks.length);
  }

  get paginatedTasks(): CompleteTasksDetailsDto[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTasks.slice(start, start + this.itemsPerPage);
  }
}