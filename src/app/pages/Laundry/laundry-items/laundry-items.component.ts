import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/laundry/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-items',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './laundry-items.component.html',
  styleUrl: './laundry-items.component.css'
})
export class LaundryItemsComponent {

}
