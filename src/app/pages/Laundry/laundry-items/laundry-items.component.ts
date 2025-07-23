import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { ItemGridComponent } from '@app/components/laundry/item-grid/item-grid.component';



@Component({
  selector: 'app-laundry-items',
  imports: [RouterModule , FooterComponent, ItemGridComponent, NavbarComponent ],
  templateUrl: './laundry-items.component.html', // fixed typo here
  standalone: true  // add this if using standalone components (Angular 14+)
})
export class LaundryItemsComponent implements OnInit {
  @ViewChild(ItemGridComponent) itemGrid!: ItemGridComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    // Refresh items when component initializes
    setTimeout(() => {
      this.refreshItems();
    }, 100);

    // Listen for navigation events to refresh items when returning from edit
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url === '/laundry-items') {
        // Refresh items when navigating back to this page
        setTimeout(() => {
          this.refreshItems();
        }, 100);
      }
    });
  }

  onAddNewItem() {
    // TODO: Implement your logic here
    console.log('Add New Item button clicked');
    // e.g., navigate to add-item page or open a modal
  }

  refreshItems() {
    if (this.itemGrid) {
      this.itemGrid.loadItems();
    }
  }
}
