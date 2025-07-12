import { Component } from '@angular/core';
import { DriverNavbarComponent } from '../../../components/driver/driver-navbar/driver-navbar.component';
import { CompleteTaskHeaderComponent } from '../../../components/driver/complete-task-header/complete-task-header.component';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { CompleteOrderListComponent } from '../../../components/driver/complete-order-list/complete-order-list.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
@Component({
  selector: 'app-complete-tasks-page',
  imports: [DriverNavbarComponent, CompleteTaskHeaderComponent, SearchBarComponent, CompleteOrderListComponent, PaginationComponent, FooterComponent],
  templateUrl: './complete-tasks-page.component.html',
  styleUrl: './complete-tasks-page.component.scss'
})
export class CompleteTasksPageComponent {

}
