import { Component, OnInit } from '@angular/core';
import { Laundry } from '../../../models/laundry.model';
import { LaundryService } from '../../../services/laundry.service';
import { LaundryCardComponent } from '../laundry-card/laundry-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laundry-list',
  standalone: true,
  imports: [CommonModule, LaundryCardComponent],
  templateUrl: './laundry-list.component.html',
  styleUrls: ['./laundry-list.component.css']
})
export class LaundryListComponent implements OnInit {
  laundries: Laundry[] = []; //holds an empty array of Laundry objects

  constructor(private laundryService: LaundryService) {}

  ngOnInit() {
    this.laundries = this.laundryService.getLaundries();
    console.log('Laundries:', this.laundries); // Debugging- just to make sure 
  }
  
}
