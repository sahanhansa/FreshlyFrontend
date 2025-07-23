import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedImports } from '../../../shared/shared-imports';
import { Feedback } from '../../../models/feedback.model';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [...SharedImports, FormsModule],
  providers: [FeedbackService],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  // Data and pagination properties using signals
  selectedCategory = signal<'customer' | 'driver' | 'laundry'>('customer');

  filterByCategory(category: 'customer' | 'driver' | 'laundry'): void {
    this.selectedCategory.set(category);
    let filtered: Feedback[] = [];
    switch (category) {
      case 'customer':
        filtered = this.feedbacks().filter(f => {
          const type = (f.submittedByType || '').toLowerCase();
          return type === 'c';
        });
        break;
      case 'driver':
        filtered = this.feedbacks().filter(f => {
          const type = (f.submittedByType || '').toLowerCase();
          return type === 'd';
        });
        break;
      case 'laundry':
        filtered = this.feedbacks().filter(f => {
          const type = (f.submittedByType || '').toLowerCase();
          return type === 'l';
        });
        break;
    }
    this.filteredFeedbacks.set(filtered);
    this.currentPage.set(1);
    this.calculateTotalPages();
    this.updatePageNumbers();
    this.updatePaginatedComplaints();
  }
  feedbacks = signal<Feedback[]>([]);
  filteredFeedbacks = signal<Feedback[]>([]);
  paginatedComplaints = signal<Feedback[]>([]);
  selectedFeedback = signal<Feedback | null>(null);
  // UI state properties
  showTable = signal<boolean>(true);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  searchQuery = signal<string>('');
  itemsPerPage = signal<number>(9);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  pageNumbers = signal<number[]>([] as number[]);
  // Computed values
  currentEndIndex = computed(() => {
    return Math.min(
      this.currentPage() * this.itemsPerPage(),
      this.filteredFeedbacks().length
    );
  });
  currentStartIndex = computed(() => {
    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  });
  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}
  // Helper methods for accessing selected feedback properties
  getSelectedFeedbackProp<K extends keyof Feedback>(prop: K, defaultValue: Feedback[K]): Feedback[K] {
    return this.selectedFeedback()?.[(prop)] ?? defaultValue;
  }
  ngOnInit(): void {
    this.loadFeedbacks();
  }
  loadFeedbacks(): void {
    this.loading.set(true);
    this.error.set(null);
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbacks.set(data);
        // Filter by selected category on load
        this.filterByCategory(this.selectedCategory());
        this.calculateTotalPages();
        this.updatePageNumbers();
        this.updatePaginatedComplaints();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(`Failed to load complaints. ${err.message}`);
        this.loading.set(false);
      }
    });
  }
  onSearch(query: string): void {
    this.searchQuery.set(query);
    if (!query) {
      this.filteredFeedbacks.set([...this.feedbacks()]);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = this.feedbacks().filter(feedback => 
        feedback.customerName?.toLowerCase().includes(lowerQuery) || 
        feedback.laundryName?.toLowerCase().includes(lowerQuery) || 
        feedback.description?.toLowerCase().includes(lowerQuery) ||
        feedback.feedbackId.toLowerCase().includes(lowerQuery) ||
        feedback.customerId?.toLowerCase().includes(lowerQuery) ||
        feedback.laundryId?.toLowerCase().includes(lowerQuery)
      );
      this.filteredFeedbacks.set(filtered);
    }
    this.currentPage.set(1);
    this.calculateTotalPages();
    this.updatePageNumbers();
    this.updatePaginatedComplaints();
  }
  calculateTotalPages(): void {
    const total = Math.ceil(this.filteredFeedbacks().length / this.itemsPerPage()) || 1;
    this.totalPages.set(total);
  }
  updatePageNumbers(): void {
    const numbers: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      numbers.push(i);
    }
    this.pageNumbers.set(numbers);
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.updatePaginatedComplaints();
    }
  }
  updatePaginatedComplaints(): void {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const sliced = this.filteredFeedbacks().slice(
      startIndex, 
      startIndex + this.itemsPerPage()
    );
    this.paginatedComplaints.set(sliced);
  }
  onItemsPerPageChange(value: number): void {
    this.itemsPerPage.set(value);
    this.calculateTotalPages();
    this.currentPage.set(1); // Reset to first page
    this.updatePageNumbers();
    this.updatePaginatedComplaints();
  }
  viewFeedbackDetails(feedback: Feedback): void {
    this.selectedFeedback.set(feedback);
  }
  closeModal(): void {
    this.selectedFeedback.set(null);
  }
  deleteFeedbackAndClose(id: string): void {
    this.deleteFeedback(id);
    this.closeModal();
  }
  deleteFeedback(id: string): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.loading.set(true);
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => {
          const updatedFeedbacks = this.feedbacks().filter(f => f.feedbackId !== id);
          this.feedbacks.set(updatedFeedbacks);
          this.filteredFeedbacks.set(this.filteredFeedbacks().filter(f => f.feedbackId !== id));
          this.calculateTotalPages();
          this.updatePageNumbers();
          this.updatePaginatedComplaints();
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(`Failed to delete complaint. ${err.message}`);
          this.loading.set(false);
        }
      });
    }
  }
}
