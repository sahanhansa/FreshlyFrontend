import { Component } from '@angular/core';
import { EditItemComponent } from "@app/components/laundry/edit-item/edit-item.component";
import { FooterComponent } from '@app/components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-edit-item',
  imports: [EditItemComponent,FooterComponent ],
  templateUrl: './laundry-edit-item.component.html',
  styleUrl: './laundry-edit-item.component.scss'
})
export class LaundryEditItemComponent {

}
