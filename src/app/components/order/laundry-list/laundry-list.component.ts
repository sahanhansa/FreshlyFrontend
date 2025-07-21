import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { Laundry } from '../../../models/laundry.model';
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
   // Input property to receive array of laundries from laundry page
  @Input() laundries: Laundry[] = []; 
  @Input() loading = false;
  @Input() error = '';
  
  // Output events that communicate with the laundry page
  @Output() selectLaundry = new EventEmitter<string>();
  //@Output() favoriteToggled = new EventEmitter<Laundry>();
  @Output() retryLoading = new EventEmitter<void>();

  // Method called when a laundry's favorite status is toggled
  // toggleFavorite(laundry: Laundry) {
  //   this.favoriteToggled.emit(laundry);
  // }

  // Method called when a laundry is selected
  onSelectLaundry(laundryId: string) {
    this.selectLaundry.emit(laundryId);
  }
}