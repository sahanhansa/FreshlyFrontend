import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LaundryAdminDTO } from '../../../models/laundry-admin.model';
import { LaundryAdminService } from '../../../services/laundry-admin.service';
import { SharedImports } from '../../../shared/shared-imports';

@Component({
  selector: 'app-laundries',
  standalone: true,
  imports: [...SharedImports, FormsModule],
  providers: [LaundryAdminService],
  templateUrl: './laundries.component.html',
  styleUrl: './laundries.component.css'
})
export class LaundriesComponent implements OnInit {
  // Data collections
  laundries = signal<LaundryAdminDTO[]>([]);
  filteredLaundries = signal<LaundryAdminDTO[]>([]);
  // UI state
  showTable = signal<boolean>(true);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  searchText = signal<string>('');
  entriesPerPage = signal<number>(10);
  selectedLaundry = signal<LaundryAdminDTO | null>(null);
  showDeleteConfirmation = signal<boolean>(false);
  deleteInProgress = signal<boolean>(false);
  deleteSuccess = signal<boolean>(false);
  deleteError = signal<string | null>(null);
  currentPage = signal<number>(1);
  // Search type for filtering
  searchType = signal<string>('all');
  showAddLaundryModal = false;
  newLaundry: any = {
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerUsername: '',
    houseNo: '',
    street: '',
    city: '',
    postalCode: '',
    laundryName: '',
    laundryUsername: '',
    laundryPassword: '',
    laundryEmail: ''
  };

  openAddLaundryModal() {
    this.showAddLaundryModal = true;
  }

  closeAddLaundryModal() {
    this.showAddLaundryModal = false;
    this.newLaundry = {
      ownerFirstName: '',
      ownerLastName: '',
      ownerEmail: '',
      ownerPassword: '',
      ownerUsername: '',
      houseNo: '',
      street: '',
      city: '',
      postalCode: '',
      laundryName: '',
      laundryUsername: '',
      laundryPassword: '',
      laundryEmail: ''
    };
  }

  submitAddLaundry() {
    // Basic validation: check for empty or placeholder values
    const requiredFields = [
      'ownerFirstName', 'ownerLastName', 'ownerEmail', 'ownerPassword', 'ownerUsername',
      'houseNo', 'street', 'city', 'postalCode',
      'laundryName', 'laundryUsername', 'laundryPassword', 'laundryEmail'
    ];
    for (const field of requiredFields) {
      const value = (this.newLaundry[field] || '').trim();
      if (!value || value.toLowerCase() === 'string') {
        alert(`Please enter a valid value for ${field.replace(/([A-Z])/g, ' $1')}`);
        return;
      }
    }
    this.laundryService
      .createLaundryAccount(this.newLaundry)
      .subscribe({
        next: () => {
          this.closeAddLaundryModal();
          // Optionally reload laundries list here if you have a method for it
        },
        error: (err: any) => {
          alert('Failed to add laundry: ' + (err?.message || err));
        }
      });
  }
  showStatusChangeConfirmation = signal<boolean>(false);

  /**
   * Show confirmation dialog for status change
   */
  promptStatusChangeConfirmation(): void {
    this.showStatusChangeConfirmation.set(true);
  }

  /**
   * Cancel status change operation
   */
  cancelStatusChange(): void {
    this.showStatusChangeConfirmation.set(false);
  }

  /**
   * Confirm and execute status change operation
   */
  confirmStatusChange(): void {
    const laundry = this.selectedLaundry();
    if (!laundry) return;
    this.loading.set(true);
    if ((laundry.accountStatus || '').toLowerCase() === 'active') {
      // Use PATCH /api/Laundry/{id}/delete for deactivation
      this.laundryService.deleteLaundry(laundry.laundryId).subscribe({
        next: () => {
          this.selectedLaundry.set({ ...laundry, accountStatus: 'Inactive' });
          this.laundries.set(this.laundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Inactive' } : l));
          this.filteredLaundries.set(this.filteredLaundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Inactive' } : l));
          this.loading.set(false);
          this.showStatusChangeConfirmation.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      });
    } else {
      // Use PATCH /api/Laundry/{id}/activate for activation
      this.laundryService.activateLaundry(laundry.laundryId).subscribe({
        next: () => {
          this.selectedLaundry.set({ ...laundry, accountStatus: 'Active' });
          this.laundries.set(this.laundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Active' } : l));
          this.filteredLaundries.set(this.filteredLaundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Active' } : l));
          this.loading.set(false);
          this.showStatusChangeConfirmation.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      });
    }
  }
  /**
   * Activate selected laundry account
   */
  activateLaundry(): void {
    const laundry = this.selectedLaundry();
    if (!laundry) return;
    this.loading.set(true);
    this.laundryService.activateLaundry(laundry.laundryId).subscribe({
      next: () => {
        // Update local state
        this.selectedLaundry.set({ ...laundry, accountStatus: 'Active' });
        // Also update in laundries and filteredLaundries arrays
        this.laundries.set(this.laundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Active' } : l));
        this.filteredLaundries.set(this.filteredLaundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Active' } : l));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  /**
   * Deactivate selected laundry account
   */
  deactivateLaundry(): void {
    const laundry = this.selectedLaundry();
    if (!laundry) return;
    this.loading.set(true);
    this.laundryService.deactivateLaundry(laundry.laundryId).subscribe({
      next: () => {
        // Update local state
        this.selectedLaundry.set({ ...laundry, accountStatus: 'Inactive' });
        // Also update in laundries and filteredLaundries arrays
        this.laundries.set(this.laundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Inactive' } : l));
        this.filteredLaundries.set(this.filteredLaundries().map(l => l.laundryId === laundry.laundryId ? { ...l, accountStatus: 'Inactive' } : l));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
  // ...existing code...

  constructor(private laundryService: LaundryAdminService) {}

  ngOnInit(): void {
    this.fetchLaundries();
  }

  /**
   * Fetch all laundries from the backend
   */
  fetchLaundries(): void {
    this.loading.set(true);
    this.error.set(null);

    this.laundryService.getLaundries().subscribe({
      next: (data) => {
        this.laundries.set(data);
        this.filteredLaundries.set([...data]);
        this.loading.set(false);

        if (this.filteredLaundries().length > 0 && !this.selectedLaundry()) {
          this.selectedLaundry.set(this.filteredLaundries()[0]);
        } else if (this.filteredLaundries().length === 0) {
          console.warn('No laundries returned from the API.');
        }
      },
      error: (err) => {
        console.error('Error fetching laundries:', err);
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  /**
   * Filter laundries based on search text
   */
  filterLaundries(searchText: string): void {
    this.searchText.set(searchText);
    if (!searchText) {
      this.filteredLaundries.set([...this.laundries()]);
      return;
    }

    const searchTermLower = searchText.toLowerCase();
    const filtered = this.laundries().filter(laundry => {
      switch (this.searchType()) {
        case 'name':
          return (laundry.laundryName || '').toLowerCase().includes(searchTermLower);
        case 'email':
          return (laundry.email || '').toLowerCase().includes(searchTermLower);
        case 'username':
          return (laundry.username || '').toLowerCase().includes(searchTermLower);
        case 'owner':
          return (laundry.ownerName || '').toLowerCase().includes(searchTermLower);
        case 'laundryId':
          return (laundry.laundryId || '').toLowerCase().includes(searchTermLower);
        case 'all':
        default:
          return (
            (laundry.laundryName || '').toLowerCase().includes(searchTermLower) ||
            (laundry.username || '').toLowerCase().includes(searchTermLower) ||
            (laundry.email || '').toLowerCase().includes(searchTermLower) ||
            (laundry.ownerName || '').toLowerCase().includes(searchTermLower) ||
            (laundry.laundryId || '').toLowerCase().includes(searchTermLower)
          );
      }
    });

    this.filteredLaundries.set(filtered);
  }

  /**
   * Select a laundry for details view
   */
  selectLaundry(laundry: LaundryAdminDTO): void {
    this.selectedLaundry.set(laundry);
  }

  // ...existing code...

  /**
   * Get paginated laundries
   */
  get paginatedLaundries(): LaundryAdminDTO[] {
    if (!this.filteredLaundries() || this.filteredLaundries().length === 0) {
      return [];
    }
    const startIndex = (this.currentPage() - 1) * this.entriesPerPage();
    return this.filteredLaundries().slice(startIndex, startIndex + this.entriesPerPage());
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
    return Math.ceil(this.filteredLaundries().length / this.entriesPerPage());
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
    }
    
    // Default: show 2 pages before and after current page
    return [
      this.currentPage() - 2,
      this.currentPage() - 1,
      this.currentPage(),
      this.currentPage() + 1,
      this.currentPage() + 2
    ];
  }
}
