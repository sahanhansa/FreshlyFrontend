import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/shared/footer/footer.component";
import { LaundryListComponent } from "./components/order/laundry-list/laundry-list.component";
import { ItemCardComponent } from "./components/order/item-card/item-card.component";
import { ItemCardListComponent } from "./components/order/item-card-list/item-card-list.component";
import { ItemsListPageComponent } from "./pages/order/items-list-page/items-list-page.component";
import { ItemCategoryComponent } from "./components/order/item-category/item-category.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, LaundryListComponent, RouterOutlet, ItemCardComponent, ItemCardListComponent, ItemsListPageComponent, ItemCategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
