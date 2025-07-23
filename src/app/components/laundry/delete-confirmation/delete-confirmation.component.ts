import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent {
  @Input() itemId: string = '';
  @Input() itemName: string = '';
  @Input() isDeleting: boolean = false;
  @Output() confirmed = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private router: Router) {}

  onConfirm() {
    this.confirmed.emit(this.itemId);
  }

  onCancel() {
    this.cancelled.emit();
  }

  onBack() {
    this.router.navigate(['/laundry-items']);
  }
}
