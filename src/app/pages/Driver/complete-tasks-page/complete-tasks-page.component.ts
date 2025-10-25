import { Component } from '@angular/core';
import { DriverNavbarComponent } from '../../../components/driver/driver-navbar/driver-navbar.component';
import { CompleteTaskHeaderComponent } from '../../../components/driver/complete-task-header/complete-task-header.component';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { CompleteOrderListComponent } from '../../../components/driver/complete-order-list/complete-order-list.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-complete-tasks-page',
  standalone: true,
  imports: [
    DriverNavbarComponent,
    CompleteTaskHeaderComponent,
    SearchBarComponent,
    CompleteOrderListComponent,
    PaginationComponent,
    FooterComponent
  ],
  templateUrl: './complete-tasks-page.component.html',
  styleUrls: ['./complete-tasks-page.component.css']
})
export class CompleteTasksPageComponent {
  searchQuery: string = '';
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 2;

  onSearchChanged(query: string): void {
    this.searchQuery = query;
  }

  onTotalItemChange(count: number): void {
    this.totalItems = count;
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
  }
}
