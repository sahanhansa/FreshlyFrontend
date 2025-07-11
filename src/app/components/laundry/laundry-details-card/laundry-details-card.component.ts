import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laundry-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laundry-details-card.component.html'
})
export class LaundryDetailsCardComponent {
  @Input() laundry: any;
}
