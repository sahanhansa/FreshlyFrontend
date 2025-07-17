import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-details-card',
  standalone: true,
  imports: [CommonModule],
 templateUrl: './owner-details-card.component.html',

})
export class OwnerDetailsCardComponent {
  @Input() owner: any;
}
