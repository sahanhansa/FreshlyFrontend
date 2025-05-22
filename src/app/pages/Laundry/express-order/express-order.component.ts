import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { TableComponent } from '../../../components/laundry/table2/table2.component';




@Component({
  selector: 'app-express-order',
  imports: [SearchBarComponent,TableComponent,PaginationComponent,FooterComponent],
  templateUrl: './express-order.component.html',
  styleUrl: './express-order.component.css'
})
export class ExpressOrderComponent {

}
