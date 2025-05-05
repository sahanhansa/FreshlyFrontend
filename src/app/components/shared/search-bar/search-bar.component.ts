import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full">
      <input
        type="text"
        [(ngModel)]="searchValue"
        (ngModelChange)="onSearchChange()"
        [placeholder]="placeholder"
        [attr.aria-label]="ariaLabel"
        class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  `,
  styles: []
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Input() ariaLabel: string = 'Search';
  @Input() initialValue: string = '';
  
  @Output() searchChanged = new EventEmitter<string>();
  
  searchValue: string = '';
  
  ngOnInit() {
    this.searchValue = this.initialValue;
  }
  
  onSearchChange(): void {
    this.searchChanged.emit(this.searchValue);
  }
}
