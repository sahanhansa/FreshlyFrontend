import { Component  , Input} from '@angular/core';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/laundry/header/header.component';



@Component({
  selector: 'app-home',
  imports: [ FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() laundryName: string = 'Laundry Name';

  constructor(private router: Router) {}

  goToNewOrder() {
    this.router.navigate(['/new-orders']);
  }

   goToProcessingOrder() {
    this.router.navigate(['/processing-orders']);
  }
}
