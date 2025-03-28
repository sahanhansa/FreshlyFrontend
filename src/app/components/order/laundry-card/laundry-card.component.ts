import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laundry-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laundry-card.component.html',
  styleUrls: ['./laundry-card.component.css']
})
export class LaundryCardComponent { //@Input() marks receive data from a parent component
  @Input() public name!: string;
  @Input() public location!: string;
  @Input() public rating!: number;
  @Input() public imageUrl!: string;

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
