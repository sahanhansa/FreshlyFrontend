import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubtotalPipe } from '../../../pipes/subtotal.pipe';
import { OrderService } from '../../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { Order, OrderItem } from '../../../models/order.model';

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
  status: string;
  customerId: string;
  driverId: string;
  laundryId: string;
  items: DisplayOrderItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, SubtotalPipe, HttpClientModule],
  providers: [OrderService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  // Mock data for initial display and fallback
  mockOrders: DisplayOrder[] = [
    {
      id: '#01',
      date: '18/12/2024',
      status: 'Completed',
      customerId: '#01',
      driverId: '23',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#02',
      date: '18/12/2024',
      status: 'Picked Up',
      customerId: '#01',
      driverId: '24',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#03',
      date: '18/12/2024',
      status: 'Cancelled',
      customerId: '#01',
      driverId: '04',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#04',
      date: '18/12/2024',
      status: 'Processing',
      customerId: '#01',
      driverId: '07',
      laundryId: '#01',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#05',
      date: '18/12/2024',
      status: 'Completed',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#06',
      date: '18/12/2024',
      status: 'Picked Up',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#07',
      date: '18/12/2024',
      status: 'Cancelled',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#08',
      date: '18/12/2024',
      status: 'Processing',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#09',
      date: '18/12/2024',
      status: 'Processing',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    },
    {
      id: '#10',
      date: '18/12/2024',
      status: 'Completed',
      customerId: '#01',
      driverId: '#01',
      laundryId: '18/12/2024',
      items: [
        { item: 'Shirt', process: 'Wash+Iron', clotheType: 'Mens', count: 3, pricePerItem: 200, totalPrice: 600 },
        { item: 'Socks', process: 'Washing', clotheType: 'Kids', count: 4, pricePerItem: 100, totalPrice: 400 },
        { item: 'Bedsheet', process: 'Dry Clean', clotheType: 'Other', count: 1, pricePerItem: 500, totalPrice: 500 },
        { item: 'Trousers', process: 'Wash', clotheType: 'Ladies', count: 1, pricePerItem: 300, totalPrice: 300 }
      ]
    }
  ];

  // Actual data to display
  orders: DisplayOrder[] = [];
  selectedOrder: DisplayOrder | null = null;
  itemsPerPage = 9;
  currentPage = 1;
  searchQuery = '';
  loading = false;
  error: string | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // Load data on component initialization
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

    this.orderService.getOrderDetails().subscribe({
      next: (apiOrders) => {
        // Transform API data to display format
        this.orders = this.transformOrderData(apiOrders);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.error = 'Failed to load orders from the server. Please try again later.';
        this.loading = false;
        // Display an empty table instead of using mock data
        this.orders = [];
      }
    });
  }

  /**
   * Transform API order data to display format
   */
  private transformOrderData(apiOrders: Order[]): DisplayOrder[] {
    if (!apiOrders || apiOrders.length === 0) return [];

    return apiOrders.map(order => {
      return {
        id: order.orderId,
        date: this.formatDate(order.placedDate),
        status: order.status?.statusName || 'Processing',
        customerId: order.customer?.customerId || 'N/A',
        driverId: order.user?.userId || 'N/A',
        laundryId: order.laundry?.laundryId || 'N/A',
        items: this.transformOrderItems(order.items || [])
      };
    });
  }

  /**
   * Transform API order items to display format
   */
  private transformOrderItems(apiItems: OrderItem[]): DisplayOrderItem[] {
    return apiItems.map(item => {
      return {
        item: item.item,
        process: item.process,
        clotheType: item.clotheType,
        count: item.count,
        pricePerItem: item.pricePerItem,
        totalPrice: item.totalPrice
      };
    });
  }

  /**
   * Format date from API format to display format
   */
  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  }

  get filteredOrders(): DisplayOrder[] {
    return this.orders.filter(order => 
      this.searchQuery ? 
        order.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.driverId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.laundryId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      : true
    );
  }

  get paginatedOrders(): DisplayOrder[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  /**
   * Generates an array of page numbers for pagination
   * @returns Array of page numbers
   */
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  // For pagination template
  get Math() {
    return Math;
  }
}