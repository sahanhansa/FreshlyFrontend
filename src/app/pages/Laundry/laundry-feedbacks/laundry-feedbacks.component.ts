import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/shared/header /header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-feedbacks',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './laundry-feedbacks.component.html',
  styleUrl: './laundry-feedbacks.component.css'
})
export class LaundryFeedbacksComponent {

}
