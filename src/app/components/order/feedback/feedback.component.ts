import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackRequest } from '../../../models/feedback.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Input() orderId: string = '';
  @Input() laundryId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();

  feedback: FeedbackRequest = {
    description: '',
    rating: 0,
    orderId: '',
    laundryId: ''
  };

  hoveredStar: number = 0;
  isSubmitting: boolean = false;
  error: string | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.feedback.orderId = this.orderId;
    this.feedback.laundryId = this.laundryId;

    // Check if user already submitted feedback
    this.feedbackService.getFeedbackByOrderId(this.orderId).subscribe({
      next: (existingFeedback) => {
        if (existingFeedback) {
          this.feedback.rating = existingFeedback.rating;
          this.feedback.description = existingFeedback.description;
          this.toastService.show('Feedback', 'You have already rated this order', 'info');
        }
      },
      error: () => {
        // No existing feedback, which is fine
      }
    });
  }

  setRating(rating: number): void {
    this.feedback.rating = rating;
  }

  setHoveredStar(star: number): void {
    this.hoveredStar = star;
  }

  clearHoveredStar(): void {
    this.hoveredStar = 0;
  }

  submitFeedback(): void {
    if (this.feedback.rating === 0) {
      this.error = 'Please select a rating';
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: () => {
        this.toastService.show('Feedback', 'Thank you for your feedback!', 'success');
        this.isSubmitting = false;
        this.submitted.emit();
        this.close.emit();
      },
      error: (err) => {
        this.error = err.error || 'Failed to submit feedback';
        this.isSubmitting = false;
        console.error('Error submitting feedback:', err);
      }
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  // Helper method to generate array for star rating
  get starsArray(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
