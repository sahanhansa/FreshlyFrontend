import { Component } from '@angular/core';

@Component({
  selector: 'app-marks-to-done-button',
  imports: [],
  templateUrl: './marks-to-done-button.component.html',
  styleUrl: './marks-to-done-button.component.css'
})
export class MarksToDoneButtonComponent {
   // Add the confirmPickup method
   confirmPickup() {
    // Add your logic here to handle the button click
    console.log('Pickup confirmed!');
    // For example, you might want to call a service to update the order status

}}
