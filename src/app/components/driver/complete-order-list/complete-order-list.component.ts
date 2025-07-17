import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteTasksService, CompleteTasksDetailsDto } from '../../../services/complete-tasks.service';

@Component({
  selector: 'app-complete-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complete-order-list.component.html',
  styleUrls: ['./complete-order-list.component.css']
})
export class CompleteOrderListComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = '';
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Output() totalItemChange = new EventEmitter<number>();

  allOrders: CompleteTasksDetailsDto[] = [];
  filteredOrders: CompleteTasksDetailsDto[] = [];

  constructor(private completeTasksService: CompleteTasksService) {}

  ngOnInit(): void {
    this.loadCompleteTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['currentPage']) {
      this.filterOrders();
    }
  }

  loadCompleteTasks(): void {
    this.completeTasksService.getAllCompleteTasks().subscribe({
      next: (data) => {
        this.allOrders = data;
        this.filterOrders();
      },
      error: (err) => {
        console.error('❌ Failed to load complete tasks:', err);
      }
    });
  }

  filterOrders(): void {
    const query = this.searchQuery?.toLowerCase() || '';

    this.filteredOrders = this.allOrders.filter(order => {
      const matchesCustomer = order.customerName.toLowerCase().includes(query);
      const matchesOrderId = order.orderId.toLowerCase().includes(query);
      const matchesStatus = order.status.toLowerCase().includes(query);
      return matchesCustomer || matchesOrderId || matchesStatus;
    });

    this.totalItemChange.emit(this.filteredOrders.length);
  }

  get paginatedOrders(): CompleteTasksDetailsDto[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  openSummary(order: CompleteTasksDetailsDto) {
    console.log('Order summary clicked:', order);
  }
}
