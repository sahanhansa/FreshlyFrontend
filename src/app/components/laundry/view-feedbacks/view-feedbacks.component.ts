import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback } from '@app/models/feedback.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-feedbacks',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-feedbacks.component.html'
})
export class ViewFeedbacksComponent implements OnInit {
  feedbacks: (Feedback & { showReply?: boolean; replyText?: string })[] = [];
  loading: boolean = true;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    // Get laundry ID from localStorage
    const laundryId = localStorage.getItem('laundryId'); // Assuming 'userId' contains the laundry ID
    
    if (!laundryId) {
      console.error('Laundry ID not found in localStorage');
      this.loading = false;
      return;
    }

    this.feedbackService.getFeedbacks(laundryId).subscribe({
      next: (data) => {
        // Extend each feedback object with `showReply` and `replyText`
        this.feedbacks = data.map((f) => ({
          ...f,
          showReply: false,
          replyText: ''
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading feedbacks:', error);
        this.loading = false;
      }
    });
  }

  toggleReply(index: number): void {
    this.feedbacks[index].showReply = !this.feedbacks[index].showReply;
  }

  submitReply(index: number): void {
    const reply = this.feedbacks[index].replyText?.trim();
    if (!reply) return;

    console.log(`Reply to ${this.feedbacks[index].customerFName}: ${reply}`);
    // TODO: Send reply to backend via API (optional)

    this.feedbacks[index].showReply = false;
    this.feedbacks[index].replyText = '';
  }
}