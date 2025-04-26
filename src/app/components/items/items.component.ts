import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="items-container">
      <h1>Items Management</h1>
      <!-- Add your items management content here -->
    </div>
  `,
  styles: [`
    .items-container {
      padding: 20px;
    }
  `]
})
export class ItemsComponent {} 