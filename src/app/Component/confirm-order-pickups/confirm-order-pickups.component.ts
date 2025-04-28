import { Component } from '@angular/core';
import { MarksToDoneButtonComponent } from '../marks-to-done-button/marks-to-done-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-order-pickups',
  imports: [MarksToDoneButtonComponent, RouterLink],
  templateUrl: './confirm-order-pickups.component.html',
  styleUrl: './confirm-order-pickups.component.css'
})
export class ConfirmOrderPickupsComponent {
 
  }


