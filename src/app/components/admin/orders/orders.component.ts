import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminOrderService, AdminOrderDTO } from '../../../services/admin/admin-order.service';

// Internal representation for display
interface DisplayOrderItem {
  item: string;
  process: string;
  clotheType: string;
  count: number;
  pricePerItem: number;
  totalPrice: number;
}

interface DisplayOrder {
  id: string;
  date: string;
  status: string | {
    statusID?: string;
    statusName?: string;
    statusDisplayName: string;
  };
  customerName: string;
  totalCost: number;
  isExpanded?: boolean;
  customer?: {
    customerId?: string;
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
    address?: {
      addressId?: string;
      houseNo?: string;
      street?: string;
      city?: string;
      postalCode?: string;
      fullAddress?: string;
      placedDate?: string | null;
    };
  };
  laundry?: {
    laundryId?: string;
    laundryName?: string;
    statusName?: string;
  };
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [OrderService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  getStatusField(status: string | { statusID?: string; statusName?: string; statusDisplayName?: string }, field: 'statusID' | 'statusName' | 'statusDisplayName'): string {
    if (typeof status === 'object' && status && field in status) {
      return (status as any)[field] || '';
    }
    return '';
  }
  getStatusDisplayName(status: string | { statusDisplayName: string }): string {
    if (typeof status === 'object' && status && 'statusDisplayName' in status) {
      return status.statusDisplayName;
    }
    return status as string;
  }
  orders: DisplayOrder[] = [];
  selectedOrder: DisplayOrder | null = null;
  itemsPerPage = 9;
  currentPage = 1;
  searchQuery = '';
  loading = false;
  error: string | null = null;
  // Add Math reference to use in template
  Math = Math;

  constructor(private orderService: AdminOrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
  }

  toggleOrderDetails(order: DisplayOrder): void {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'picked up':
        return 'status-picked-up';
      case 'cancelled':
        return 'status-cancelled';
      case 'processing':
        return 'status-processing';
      default:
        return '';
    }
  }

  fetchOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrders().subscribe({
      next: (apiOrders: AdminOrderDTO[]) => {
        this.orders = this.transformOrderData(apiOrders);
        this.loading = false;
      },
      error: (err: Error) => {
        console.error('Error fetching orders:', err);
        this.error = 'Failed to load orders from the server. Please try again later.';
        this.loading = false;
        this.orders = [];
      }
    });
  }

  private transformOrderData(apiOrders: AdminOrderDTO[]): DisplayOrder[] {
    if (!apiOrders || apiOrders.length === 0) return [];

    return apiOrders.map(order => {
      return {
        id: order.orderId,
        date: this.formatDate(order.placedDate || ''),
        status: order.status ? order.status : (order.statusName || ''),
        customerName: order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : `${order.customerFName} ${order.customerLName}`,
        totalCost: order.totalCost,
        customer: order.customer,
        laundry: (order as any).laundry // fallback for missing type
      };
    });
  }

  private formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A'; // Invalid date
      return date.toLocaleDateString();
    } catch (e) {
      return 'N/A'; // Return N/A if parsing fails
    }
  }

  get filteredOrders(): DisplayOrder[] {
    return this.orders.filter(order => 
      this.searchQuery ? 
        order.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (typeof order.status === 'string' ? order.status.toLowerCase().includes(this.searchQuery.toLowerCase()) : (order.status.statusDisplayName || '').toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        order.totalCost.toString().includes(this.searchQuery)
      : true
    );
  }

  get paginatedOrders(): DisplayOrder[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}