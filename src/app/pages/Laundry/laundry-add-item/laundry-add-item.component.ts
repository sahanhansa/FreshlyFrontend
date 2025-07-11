import { Component } from '@angular/core';
import { AddItemComponent } from '@app/components/laundry/add-item/add-item.component';
import { FooterComponent } from "@app/components/shared/footer/footer.component";

@Component({
  selector: 'app-laundry-add-item',
  imports: [AddItemComponent, FooterComponent],
  templateUrl: './laundry-add-item.component.html',
  styleUrl: './laundry-add-item.component.scss'
})
export class LaundryAddItemComponent {

}
