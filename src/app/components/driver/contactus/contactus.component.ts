import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  imports: [],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobileNumber: string = '+1 012 3456 789'; // Default value
  selectedSubject: string = 'General Inquiry';
  message: string = '';

  subjects = [
    'General Inquiry',
    'Laundry Issues',
    'Payment Issues',
    'Other'
  ];

  onSubmit() {
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      selectedSubject: this.selectedSubject,
      message: this.message
    };

    console.log('Form Submitted:', formData);
    alert('Message sent successfully!');
  }
}
