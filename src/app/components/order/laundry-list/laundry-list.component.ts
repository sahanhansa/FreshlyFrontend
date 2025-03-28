import { Component, OnInit } from '@angular/core';
import { Laundry } from '../../../models/laundry.model';
import { LaundryService } from '../../../services/laundry.service';
import { LaundryCardComponent } from '../laundry-card/laundry-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-laundry-list',
  standalone: true,
  imports: [CommonModule, LaundryCardComponent, FormsModule],
  templateUrl: './laundry-list.component.html',
  styleUrls: ['./laundry-list.component.css']
})
export class LaundryListComponent implements OnInit {
  laundries: Laundry[] = []; // Holds the full list of laundries
  filteredLaundries: Laundry[] = []; // Holds the filtered list of laundries
  searchQuery: string = ''; // Holds the search input value

  constructor(private laundryService: LaundryService) {}

  ngOnInit() {
    this.laundries = this.laundryService.getLaundries();
    this.filteredLaundries = [...this.laundries]; // Initialize with the full list
  }

  filterLaundries() {
    console.log('Search Query:', this.searchQuery);
    this.filteredLaundries = this.laundries.filter((laundry) =>
      laundry.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    console.log('Filtered Laundries:', this.filteredLaundries);
  }
}
