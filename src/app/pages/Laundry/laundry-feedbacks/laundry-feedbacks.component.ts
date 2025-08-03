import { Component } from '@angular/core';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { ViewFeedbacksComponent } from "../../../components/laundry/view-feedbacks/view-feedbacks.component";
import { NavbarComponent } from '@app/components/shared/navbar/navbar.component';

@Component({
  selector: 'app-laundry-feedbacks',
  imports:  [FooterComponent, ViewFeedbacksComponent, NavbarComponent],
  templateUrl: './laundry-feedbacks.component.html'
})
export class LaundryFeedbacksComponent {

}
