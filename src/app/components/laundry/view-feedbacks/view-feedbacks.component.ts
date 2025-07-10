import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback } from '@app/models/feedback.model';

@Component({
  selector: 'app-view-feedbacks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading: boolean = true;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.loading = false;
      }
    });
  }
}
