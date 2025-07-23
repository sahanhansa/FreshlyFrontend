import { Component } from '@angular/core';

import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { PickupTasksHeaderComponent } from "../../../components/driver/pickup-tasks-header/pickup-tasks-header.component";
import { SearchBarComponent } from "../../../components/shared/search-bar/search-bar.component";
import { PickupOrderCardComponent } from "../../../components/driver/pickup-order-card/pickup-order-card.component";
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";







@Component({
  selector: 'app-pickups-tasks-mainpage',
  imports: [DriverNavbarComponent, PickupTasksHeaderComponent, PickupOrderCardComponent, SearchBarComponent, PaginationComponent, FooterComponent],


  templateUrl: './pickups-tasks-mainpage.component.html',
  styleUrls: ['./pickups-tasks-mainpage.component.css']
})
export class PickupsTasksMainpageComponent {
  searchQuery: string = '';
  isOwnSearch: boolean = false;
  totalItems = 0; 
  currentPage = 1;
  itemsPerPage = 4;

  // Handler for search component events
  onSearchChanged(query: string): void {
    this.searchQuery = query;
  }
  onTotalItemChange(page: number) {
    this.totalItems = page;
  }
  
  onPageChanged(page: number) {
    this.currentPage = page;
  }

  onGlobalSearch(): void {
    this.isOwnSearch = false;
  }

  onOwnSearch(): void {
    this.isOwnSearch = true;
  }



  // seach button handler

  selectedMode: 'global' | 'own' = 'global';

  get globalBtnClass(): string {
    return this.selectedMode === 'global'
      ? 'mode-btn flex items-center justify-center w-full sm:w-auto px-7 py-3 bg-blue-700 text-white text-lg font-medium rounded-xl shadow-xl scale-105 transition transform duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60'
      : 'mode-btn flex items-center justify-center w-full sm:w-auto px-7 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg transition transform duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60';
  }

  get ownBtnClass(): string {
    return this.selectedMode === 'own'
      ? 'mode-btn flex items-center justify-center w-full sm:w-auto px-7 py-3 bg-blue-700 text-white text-lg font-medium rounded-xl shadow-xl scale-105 transition transform duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60'
      : 'mode-btn flex items-center justify-center w-full sm:w-auto px-7 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg transition transform duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60';
  }

  selectMode(mode: 'global' | 'own'): void {
    this.selectedMode = mode;

    if (mode === 'global') {
      this.onGlobalSearch();
    } else {
      this.onOwnSearch();
    }
  }

  
}
