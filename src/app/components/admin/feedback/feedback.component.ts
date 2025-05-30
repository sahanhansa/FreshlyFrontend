import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="feedback-container">
      <h1>Customer Feedback</h1>
      <!-- Add your feedback management content here -->
    </div>
  `,
  styles: [`
    .feedback-container {
      padding: 20px;
    }
  `]
})
export class FeedbackComponent {} 