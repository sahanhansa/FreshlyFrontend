import { Component } from '@angular/core';
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';


@Component({
  selector: 'app-laundry-summary',
  imports: [NavbarComponent ,FooterComponent],
  templateUrl: './laundry-summary.component.html'
})
export class LaundrySummaryComponent {

}
