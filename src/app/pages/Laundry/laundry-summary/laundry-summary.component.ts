import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/shared/header /header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-summary',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './laundry-summary.component.html',
  styleUrl: './laundry-summary.component.css'
})
export class LaundrySummaryComponent {

}
