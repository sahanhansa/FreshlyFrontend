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
  entriesPerPage: number = 10; // Default number of entries per page
  selectedCustomer: Customer | null = null;
  showDeleteConfirmation: boolean = false;
  deleteInProgress: boolean = false;
  deleteSuccess: boolean = false;
  deleteError: string | null = null;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Automatically fetch customers when the component initializes
    this.fetchCustomers();
  }

  getCurrentRoute(): string {
    return this.router.url;
  }

  fetchCustomers(): void {
    this.loading = true;
    this.error = null;
    
    this.customerService.getCustomerDetails().subscribe({
      next: (data) => {
        // Ensure each customer has a contacts array
        this.customers = data.map(customer => ({
          ...customer,
          contacts: customer.contacts || []
        }));
        
        // Initialize filtered customers with all customers
        this.filteredCustomers = [...this.customers];
        this.loading = false;
        
        // Select the first customer by default
        if (this.filteredCustomers.length > 0 && !this.selectedCustomer) {
          this.selectedCustomer = this.filteredCustomers[0];
        }
      },
      error: (err) => {
        console.error('Error details:', err);
        this.error = 'Failed to fetch customers. Please check if the API is running.';
        this.loading = false;
      }
    });
  }

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
             // Search in contacts if they exist
             (customer.contacts && customer.contacts.some(contact => 
               contact.toLowerCase().includes(searchTermLower)
             ));
    });
    
    // Update selected customer if needed
    if (this.filteredCustomers.length > 0) {
      if (!this.selectedCustomer || !this.filteredCustomers.includes(this.selectedCustomer)) {
        this.selectedCustomer = this.filteredCustomers[0];
      }
    } else {
      this.selectedCustomer = null;
    }
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  promptDeleteConfirmation(): void {
    this.showDeleteConfirmation = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }

  confirmDelete(): void {
    this.showDeleteConfirmation = false;
    this.removeCustomer();
  }
  /**
   * Remove the selected customer from the database
   */
  removeCustomer(): void {
    if (!this.selectedCustomer || !this.selectedCustomer.customerId) {
      console.error('No customer selected or customer ID is missing');
      this.deleteError = 'Unable to remove customer: No customer selected';
      return;
    }

    this.deleteInProgress = true;
    this.deleteError = null;
    this.deleteSuccess = false;

    console.log(`Attempting to delete customer with ID: ${this.selectedCustomer.customerId}`);    this.customerService.deleteCustomer(this.selectedCustomer.customerId).subscribe({
      next: (response) => {
        console.log('Delete successful, response:', response);
        // Success - remove from local array
        this.customers = this.customers.filter(c => c.customerId !== this.selectedCustomer?.customerId);
        this.filteredCustomers = this.filteredCustomers.filter(c => c.customerId !== this.selectedCustomer?.customerId);
        this.deleteSuccess = true;
        this.selectedCustomer = null;
        this.deleteInProgress = false;
        
        // Refresh the customer list to ensure we have the latest data
        this.fetchCustomers();
        
        // Reset success message after delay
        setTimeout(() => {
          this.deleteSuccess = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
        // More detailed error message
        let errorMessage = 'Unknown error occurred';
        
        if (err.status === 0) {
          errorMessage = 'Cannot reach the server. Is the API running?';
        } else if (err.message) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        
        this.deleteError = `Failed to delete customer: ${errorMessage}`;
        this.deleteInProgress = false;
      }
    });
  }
}