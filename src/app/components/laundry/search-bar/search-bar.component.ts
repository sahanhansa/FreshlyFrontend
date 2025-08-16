import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,  // Important for imports to work
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  searchText: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchText);
  }
}
