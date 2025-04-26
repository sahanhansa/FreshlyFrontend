import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  entries = [10, 20, 30];
  selectedEntries = 10;
  searchTerm = '';

  @Output() searchTermChange = new EventEmitter<string>(); // Emits search term

  onEntriesChange(event: Event) {
    this.selectedEntries = +(event.target as HTMLSelectElement).value;
  }

  onSearchChange() {
    this.searchTermChange.emit(this.searchTerm); // Emit search term when input changes
  }
}
