import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { TableComponent } from '../../../components/laundry/table2/table2.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-regular-orders',
  imports: [SearchBarComponent,TableComponent,PaginationComponent,FooterComponent],
  templateUrl: './regular-orders.component.html',
  styleUrl: './regular-orders.component.css'
})
export class RegularOrdersComponent {

}
