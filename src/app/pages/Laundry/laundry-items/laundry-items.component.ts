import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/laundry/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { ItemCategoryComponent } from '../../../components/order/item-category/item-category.component';
import { ItemCardComponent } from '../../../components/order/item-card/item-card.component';
import { ItemCardListComponent } from '../../../components/order/item-card-list/item-card-list.component';






@Component({        
  selector: 'app-laundry-items',
  imports: [HeaderComponent, FooterComponent, ItemCategoryComponent, ItemCardComponent, ItemCardListComponent],
  templateUrl: './laundry-items.component.html',
  styleUrl: './laundry-items.component.css'
})
export class LaundryItemsComponent {

}
