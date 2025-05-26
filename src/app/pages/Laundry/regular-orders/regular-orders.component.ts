import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { TableComponent } from '../../../components/laundry/table2/table2.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';

@Component({
  selector: 'app-regular-orders',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, TableComponent, PaginationComponent],
  templateUrl: './regular-orders.component.html',
  styleUrl: './regular-orders.component.css'
})
export class RegularOrdersComponent {

}
