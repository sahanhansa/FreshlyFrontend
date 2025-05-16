import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImports } from '../../../shared/shared-imports';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: SharedImports,
  providers: [CustomerService],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  showTable: boolean = true;
  loading: boolean = false;
  error: string | null = null;
  searchText: string = '';
  entriesPerPage: number = 10;
  selectedCustomer: Customer | null = null;
  showDeleteConfirmation: boolean = false;
  deleteInProgress: boolean = false;
  deleteSuccess: boolean = false;
  deleteError: string | null = null;
  currentPage: number = 1;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  /**
   * Get the current route
   */
  getCurrentRoute(): string {
    return this.router.url;
  }

  /**
   * Fetch all customers from the backend
   */
  fetchCustomers(): void {
    this.loading = true;
    this.error = null;

    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = [...this.customers];
        this.loading = false;

        if (this.filteredCustomers.length > 0 && !this.selectedCustomer) {
          this.selectedCustomer = this.filteredCustomers[0];
        }
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  /**
   * Filter customers based on search text
   */
  filterCustomers(): void {
    if (!this.searchText) {
      this.filteredCustomers = [...this.customers];
      return;
    }

    const searchTermLower = this.searchText.toLowerCase();

    this.filteredCustomers = this.customers.filter(customer => {
      const firstName = (customer.firstName || '').toLowerCase();
      const lastName = (customer.lastName || '').toLowerCase();
      const email = (customer.email || '').toLowerCase();
      const username = (customer.username || '').toLowerCase();
      const address = (customer.address || '').toLowerCase();

      return firstName.includes(searchTermLower) ||
             lastName.includes(searchTermLower) ||
             email.includes(searchTermLower) ||
             username.includes(searchTermLower) ||
             address.includes(searchTermLower) ||
             customer.contacts.some(contact => 
               contact.toLowerCase().includes(searchTermLower)
             );
    });

    if (this.filteredCustomers.length > 0) {
      if (!this.selectedCustomer || !this.filteredCustomers.includes(this.selectedCustomer)) {
        this.selectedCustomer = this.filteredCustomers[0];
      }
    } else {
      this.selectedCustomer = null;
    }
  }

  /**
   * Select a customer for details view
   */
  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  /**
   * Show delete confirmation dialog
   */
  promptDeleteConfirmation(): void {
    this.showDeleteConfirmation = true;
  }

  /**
   * Cancel delete operation
   */
  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }

  /**
   * Confirm and execute delete operation
   */
  confirmDelete(): void {
    this.showDeleteConfirmation = false;
    this.removeCustomer();
  }

  /**
   * Remove the selected customer from the database
   */  removeCustomer(): void {
    if (!this.selectedCustomer || !this.selectedCustomer.customerId) {
      console.error('No customer selected or customer ID is missing');
      this.deleteError = 'Unable to remove customer: No customer selected';
      return;
    }

    this.deleteInProgress = true;
    this.deleteError = null;
    this.deleteSuccess = false;

    console.log(`Attempting to delete customer with ID: ${this.selectedCustomer.customerId}`);

    this.customerService.deleteCustomer(this.selectedCustomer.customerId).subscribe({
      next: () => {
        console.log('Customer deleted successfully');
        this.customers = this.customers.filter(c => c.customerId !== this.selectedCustomer?.customerId);
        this.filteredCustomers = this.filteredCustomers.filter(c => c.customerId !== this.selectedCustomer?.customerId);
        this.deleteSuccess = true;
        this.selectedCustomer = this.filteredCustomers.length > 0 ? this.filteredCustomers[0] : null;
        this.deleteInProgress = false;

        setTimeout(() => {
          this.deleteSuccess = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
        this.deleteError = err.message;
        this.deleteInProgress = false;
      }
    });
  }

  /**
   * Get paginated customers
   */
  get paginatedCustomers(): Customer[] {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    return this.filteredCustomers.slice(startIndex, startIndex + this.entriesPerPage);
  }

  /**
   * Handle page change
   */
  onPageChange(page: number): void {
    this.currentPage = page;
  }

  /**
   * Handle entries per page change
   */
  onEntriesChange(entries: number): void {
    this.entriesPerPage = entries;
    this.currentPage = 1;
  }
  /**
   * Get total number of pages
   */
  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.entriesPerPage);
  }
  
  /**
   * Get array of page numbers for pagination
   */
  get pages(): number[] {
    const pageCount = this.totalPages;
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
    
    // Show 5 pages around current page
    if (this.currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (this.currentPage >= pageCount - 2) {
      return [pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    } else {
      return [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2];
    }
  }
}