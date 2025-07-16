import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { ItemGridComponent } from '@app/components/laundry/item-grid/item-grid.component';
import { ItemCategoryComponent } from '@app/components/order/item-category/item-category.component';


@Component({
  selector: 'app-laundry-items',
  imports: [RouterModule , FooterComponent, ItemGridComponent, ItemCategoryComponent,NavbarComponent ],
  templateUrl: './laundry-items.component.html', // fixed typo here
  standalone: true  // add this if using standalone components (Angular 14+)
})
export class LaundryItemsComponent {

  onAddNewItem() {
    // TODO: Implement your logic here
    console.log('Add New Item button clicked');
    // e.g., navigate to add-item page or open a modal
  }

}
