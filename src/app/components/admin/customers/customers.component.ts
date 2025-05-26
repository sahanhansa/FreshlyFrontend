import { Component, OnInit, signal } from '@angular/core';
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
  // Data collections
  customers = signal<Customer[]>([]);
  filteredCustomers = signal<Customer[]>([]);
  
  // UI state
  showTable = signal<boolean>(true);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  searchText = signal<string>('');
  entriesPerPage = signal<number>(10);
  selectedCustomer = signal<Customer | null>(null);
  showDeleteConfirmation = signal<boolean>(false);
  deleteInProgress = signal<boolean>(false);
  deleteSuccess = signal<boolean>(false);
  deleteError = signal<string | null>(null);
  currentPage = signal<number>(1);

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
    this.loading.set(true);
    this.error.set(null);

    this.customerService.getCustomers().subscribe({
      next: (data) => {
        // Ensure all customers have their contacts array initialized
        const processedData = data.map(customer => ({
          ...customer,
          contacts: customer.contacts || []
        }));
        
        this.customers.set(processedData);
        this.filteredCustomers.set([...processedData]);
        this.loading.set(false);

        if (this.filteredCustomers().length > 0 && !this.selectedCustomer()) {
          this.selectedCustomer.set(this.filteredCustomers()[0]);
        }
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  /**
   * Filter customers based on search text
   */
  filterCustomers(searchText: string): void {
    this.searchText.set(searchText);
    if (!searchText) {
      this.filteredCustomers.set([...this.customers()]);
      return;
    }

    const searchTermLower = searchText.toLowerCase();
    const filtered = this.customers().filter(customer => {
      const firstName = (customer.firstName || '').toLowerCase();
      const lastName = (customer.lastName || '').toLowerCase();
      const email = (customer.email || '').toLowerCase();
      const username = (customer.username || '').toLowerCase();
      const address = (customer.address || '').toLowerCase();

      return firstName.includes(searchTermLower) ||
             lastName.includes(searchTermLower) ||
             email.includes(searchTermLower) ||
             username.includes(searchTermLower) ||
             address.includes(searchTermLower);
    });

    this.filteredCustomers.set(filtered);
  }

  /**
   * Select a customer for details view
   */
  selectCustomer(customer: Customer): void {
    this.selectedCustomer.set(customer);
  }

  /**
   * Show delete confirmation dialog
   */
  promptDeleteConfirmation(): void {
    this.showDeleteConfirmation.set(true);
  }

  /**
   * Cancel delete operation
   */
  cancelDelete(): void {
    this.showDeleteConfirmation.set(false);
  }

  /**
   * Confirm and execute delete operation
   */
  confirmDelete(): void {
    this.removeCustomer();
    this.showDeleteConfirmation.set(false);
  }

  /**
   * Remove the selected customer from the database
   */
  removeCustomer(): void {
    if (!this.selectedCustomer()) return;

    this.deleteInProgress.set(true);
    this.deleteError.set(null);

    this.customerService.deleteCustomer(this.selectedCustomer()!.customerId).subscribe({
      next: () => {
        const newCustomers = this.customers().filter(c => c.customerId !== this.selectedCustomer()?.customerId);
        this.customers.set(newCustomers);
        this.filteredCustomers.set(this.filteredCustomers().filter(c => c.customerId !== this.selectedCustomer()?.customerId));
        this.deleteSuccess.set(true);
        this.selectedCustomer.set(this.filteredCustomers().length > 0 ? this.filteredCustomers()[0] : null);
        this.deleteInProgress.set(false);

        setTimeout(() => {
          this.deleteSuccess.set(false);
        }, 3000);
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
        this.deleteError.set(err.message);
        this.deleteInProgress.set(false);
      }
    });
  }
  /**
   * Get paginated customers
   */
  get paginatedCustomers(): Customer[] {
    if (!this.filteredCustomers() || this.filteredCustomers().length === 0) {
      return [];
    }
    const startIndex = (this.currentPage() - 1) * this.entriesPerPage();
    return this.filteredCustomers().slice(startIndex, startIndex + this.entriesPerPage());
  }

  /**
   * Handle page change
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Handle entries per page change
   */
  onEntriesChange(entries: number): void {
    this.entriesPerPage.set(entries);
    this.currentPage.set(1);
  }

  /**
   * Get total number of pages
   */
  get totalPages(): number {
    return Math.ceil(this.filteredCustomers().length / this.entriesPerPage());
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
    if (this.currentPage() <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (this.currentPage() >= pageCount - 2) {
      return [pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    } else {
      return [this.currentPage() - 2, this.currentPage() - 1, this.currentPage(), this.currentPage() + 1, this.currentPage() + 2];
    }
  }
}