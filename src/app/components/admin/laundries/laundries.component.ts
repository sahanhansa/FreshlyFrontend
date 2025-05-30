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
      const laundryName = (laundry.laundryName || '').toLowerCase();
      const username = (laundry.username || '').toLowerCase();
      const email = (laundry.email || '').toLowerCase();
      const ownerName = (laundry.ownerName || '').toLowerCase();
      const address = (laundry.fullAddress || '').toLowerCase();

      return laundryName.includes(searchTermLower) ||
             username.includes(searchTermLower) ||
             email.includes(searchTermLower) ||
             ownerName.includes(searchTermLower) ||
             address.includes(searchTermLower);
    });

    this.filteredLaundries.set(filtered);
  }

  /**
   * Select a laundry for details view
   */
  selectLaundry(laundry: LaundryAdminDTO): void {
    this.selectedLaundry.set(laundry);
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
    this.removeLaundry();
    this.showDeleteConfirmation.set(false);
  }

  /**
   * Remove the selected laundry from the database
   */
  removeLaundry(): void {
    if (!this.selectedLaundry()) return;

    this.deleteInProgress.set(true);
    this.deleteError.set(null);

    this.laundryService.deleteLaundry(this.selectedLaundry()!.laundryId).subscribe({
      next: () => {
        const newLaundries = this.laundries().filter(l => l.laundryId !== this.selectedLaundry()?.laundryId);
        this.laundries.set(newLaundries);
        this.filteredLaundries.set(this.filteredLaundries().filter(l => l.laundryId !== this.selectedLaundry()?.laundryId));
        this.deleteSuccess.set(true);
        this.selectedLaundry.set(this.filteredLaundries().length > 0 ? this.filteredLaundries()[0] : null);
        this.deleteInProgress.set(false);

        setTimeout(() => {
          this.deleteSuccess.set(false);
        }, 3000);
      },
      error: (err) => {
        console.error('Error deleting laundry:', err);
        this.deleteError.set(err.message);
        this.deleteInProgress.set(false);
      }
    });
  }

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
