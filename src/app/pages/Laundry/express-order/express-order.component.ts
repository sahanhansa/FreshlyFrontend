import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { TableComponent } from '../../../components/laundry/table2/table2.component';

@Component({
  selector: 'app-express-order',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, TableComponent, PaginationComponent],
  templateUrl: './express-order.component.html',
  styleUrl: './express-order.component.css'
})
export class ExpressOrderComponent {

}
