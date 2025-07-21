import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="summary-container">
      <h1>Business Summary</h1>
      <!-- Add your summary content here -->
    </div>
  `,
  styles: [`
    .summary-container {
      padding: 20px;
    }
  `]
})
export class SummaryComponent {} 