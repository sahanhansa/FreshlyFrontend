import { Component  , Input} from '@angular/core';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() laundryName: string = 'Sparkle';

  constructor(private router: Router) {}

  goToRegularOrder() {
    this.router.navigate(['/regular-order']);
  }

  goToExpressOrder() {
    this.router.navigate(['/express-order']);
  }
}
