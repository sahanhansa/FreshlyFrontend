import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/laundry/header /header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-profile',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './laundry-profile.component.html',
  styleUrl: './laundry-profile.component.css'
})
export class LaundryProfileComponent {

}
