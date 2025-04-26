import { Component } from '@angular/core';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { SearchBarComponent } from '../../../components/laundry/search-bar/search-bar.component';
import { TableComponent } from '../../../components/laundry/table1/table1.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-orders',
  imports: [PaginationComponent,HeaderComponent,SearchBarComponent,TableComponent,FooterComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

}
