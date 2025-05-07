import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Laundry, LaundryWithAddressDTO } from '../../../models/laundry.model';
import { LaundryCardComponent } from '../laundry-card/laundry-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laundry-list',
  standalone: true,
  imports: [
    CommonModule,
    LaundryCardComponent
  ],
  templateUrl: './laundry-list.component.html',
  styleUrls: ['./laundry-list.component.css']
})
export class LaundryListComponent {
  @Input() laundries: Laundry[] = []; // Input of filtered laundries
  @Input() loading = false;
  @Input() error = '';
  
  @Output() selectLaundry = new EventEmitter<string>();
  @Output() favoriteToggled = new EventEmitter<Laundry>();
  @Output() retryLoading = new EventEmitter<void>();

  toggleFavorite(laundry: Laundry) {
    this.favoriteToggled.emit(laundry);
  }

  onSelectLaundry(laundryId: string) {
    this.selectLaundry.emit(laundryId);
  }
}