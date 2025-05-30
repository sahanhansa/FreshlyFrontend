import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/laundry/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { ViewFeedbacksComponent } from "../../../components/laundry/view-feedbacks/view-feedbacks.component";
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";

@Component({
  selector: 'app-laundry-feedbacks',
  imports: [HeaderComponent, FooterComponent, ViewFeedbacksComponent, PaginationComponent],
  templateUrl: './laundry-feedbacks.component.html',
  styleUrl: './laundry-feedbacks.component.css'
})
export class LaundryFeedbacksComponent {

}
