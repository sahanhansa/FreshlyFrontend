import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImports } from '../../../shared/shared-imports';
// Import the appropriate model and service for complaints
import { Feedback } from '../../../models/feedback.model';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: SharedImports,
  providers: [FeedbackService],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  // Data and pagination properties
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  paginatedComplaints: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  
  // UI state properties
  showTable: boolean = true;
  loading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';
  itemsPerPage: number = 9;
  currentPage: number = 1;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  
  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.error = null;
    
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.filteredFeedbacks = [...this.feedbacks];
        this.calculateTotalPages();
        this.updatePageNumbers();
        this.updatePaginatedComplaints();
        this.loading = false;
      },
      error: (err) => {
        this.error = `Failed to load complaints. ${err.message}`;
        this.loading = false;
      }
    });
  }

  // Open modal with feedback details
  viewFeedbackDetails(feedback: Feedback): void {
    this.selectedFeedback = { ...feedback };
  }
  
  // Close the modal
  closeModal(event: Event): void {
    // Close only if clicking the backdrop or close button
    if (
      (event.target as HTMLElement).classList.contains('bg-opacity-50') || 
      (event.target as HTMLElement).closest('button')
    ) {
      this.selectedFeedback = null;
    }
  }
  
  // Search functionality
  onSearch(query: string): void {
    this.searchQuery = query;
    if (!query) {
      this.filteredFeedbacks = [...this.feedbacks];
    } else {
      const lowerQuery = query.toLowerCase();
      this.filteredFeedbacks = this.feedbacks.filter(feedback => 
        feedback.customerName?.toLowerCase().includes(lowerQuery) || 
        feedback.laundryName?.toLowerCase().includes(lowerQuery) || 
        feedback.description?.toLowerCase().includes(lowerQuery) ||
        feedback.feedbackId.toLowerCase().includes(lowerQuery) ||
        feedback.customerId?.toLowerCase().includes(lowerQuery) ||
        feedback.laundryId?.toLowerCase().includes(lowerQuery)
      );
    }
    
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePageNumbers();
    this.updatePaginatedComplaints();
  }
  
  // Pagination logic
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredFeedbacks.length / this.itemsPerPage);
    this.totalPages = this.totalPages || 1; // Ensure at least 1 page
  }
  
  updatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }
  
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedComplaints();
    }
  }
  
  updatePaginatedComplaints(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedComplaints = this.filteredFeedbacks.slice(
      startIndex, 
      startIndex + this.itemsPerPage
    );
  }
  
  // Handling changes to items per page
  onItemsPerPageChange(): void {
    this.calculateTotalPages();
    this.currentPage = 1; // Reset to first page
    this.updatePageNumbers();
    this.updatePaginatedComplaints();
  }
  
  // Delete a feedback/complaint from the table
  deleteFeedback(id: string): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.loading = true;
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => {
          this.feedbacks = this.feedbacks.filter(f => f.feedbackId !== id);
          this.filteredFeedbacks = this.filteredFeedbacks.filter(f => f.feedbackId !== id);
          this.calculateTotalPages();
          this.updatePageNumbers();
          this.updatePaginatedComplaints();
          this.loading = false;
        },
        error: (err) => {
          this.error = `Failed to delete complaint. ${err.message}`;
          this.loading = false;
        }
      });
    }
  }
  
  // Delete feedback and close the modal
  deleteFeedbackAndClose(id: string): void {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.loading = true;
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => {
          this.feedbacks = this.feedbacks.filter(f => f.feedbackId !== id);
          this.filteredFeedbacks = this.filteredFeedbacks.filter(f => f.feedbackId !== id);
          this.calculateTotalPages();
          this.updatePageNumbers();
          this.updatePaginatedComplaints();
          this.selectedFeedback = null;
          this.loading = false;
        },
        error: (err) => {
          this.error = `Failed to delete complaint. ${err.message}`;
          this.loading = false;
          // Keep the modal open to show the error
        }
      });
    }
  }
}