import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styles: []
})
export class SearchBarComponent {
  @Input() placeholder?: string;
  @Input() ariaLabel?: string;
  @Input() initialValue: string = '';
  @Output() searchChanged = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  searchText: string = '';

  ngOnInit() {
    this.searchText = this.initialValue;
  }

  onSearchInput() {
    this.searchChanged.emit(this.searchText);
  }

  onSearchButton() {
    this.search.emit(this.searchText);
  }
}
