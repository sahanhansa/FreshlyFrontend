import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditItemComponent } from "@app/components/laundry/edit-item/edit-item.component";
import { FooterComponent } from '@app/components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-edit-item',
  imports: [EditItemComponent,FooterComponent ],
  templateUrl: './laundry-edit-item.component.html'
})
export class LaundryEditItemComponent implements OnInit {
  itemId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
    });
  }

  onItemUpdated() {
    // Don't navigate away - stay on the current edit page
    // The user can manually navigate back when they're done editing
    console.log('Item updated successfully - staying on edit page');
  }
}
