import { Component } from '@angular/core';
import { DriverNavbarComponent } from "../../../components/driver/driver-navbar/driver-navbar.component";
import { SearchBarComponent } from "../../../components/shared/search-bar/search-bar.component";
import { DeliveryTaskHeaderComponent } from "../../../components/driver/delivery-task-header/delivery-task-header.component";
import { DeliveryOrderCardComponent } from "../../../components/driver/delivery-order-card/delivery-order-card.component";
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";

@Component({
  selector: 'app-delivery-tasks-mainpage',
  standalone: true,
  imports: [
    DriverNavbarComponent,
    SearchBarComponent,
    DeliveryTaskHeaderComponent,
    DeliveryOrderCardComponent,
    PaginationComponent,
    FooterComponent
  ],
  templateUrl: './delivery-tasks-mainpage.component.html',
  styleUrl: './delivery-tasks-mainpage.component.css'
})
export class DeliveryTasksMainpageComponent {
  searchQuery: string = '';
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  isOwnSearch: boolean = false;

  onSearchChanged(query: string): void {
    this.searchQuery = query;
  }

  onTotalItemChange(count: number): void {
    this.totalItems = count;
  }

  onPageChanged(page: number): void {
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
