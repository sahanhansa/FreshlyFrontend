import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-laundry-home',
  imports:[HeaderComponent,FooterComponent],
  templateUrl: './laundry-home.component.html',
  styleUrls: ['./laundry-home.component.css']
})
export class LaundryHomeComponent {
  laundryName: string = 'Laundry Name'; // Ideally set this dynamically (e.g. from login)

  goToExpress() {
    // Navigate to express orders page
    console.log('Navigate to Express Orders');
  }

  goToRegular() {
    // Navigate to regular orders page
    console.log('Navigate to Regular Orders');
  }
}

