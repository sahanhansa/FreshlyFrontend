import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddItemComponent } from '@app/components/laundry/add-item/add-item.component';
import { FooterComponent } from "@app/components/shared/footer/footer.component";

@Component({
  selector: 'app-laundry-add-item',
  imports: [AddItemComponent, FooterComponent],
  templateUrl: './laundry-add-item.component.html'
})
export class LaundryAddItemComponent {
  constructor(private router: Router) {}

  onItemAdded() {
    // Navigate back to items page after successful item addition
    this.router.navigate(['/laundry-items']);
  }
}
