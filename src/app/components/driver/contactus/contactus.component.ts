import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { catchError, finalize, map, Observable, of } from 'rxjs';

export interface DriverContactUs {
  driverID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string[];
}

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./contactus.component.css'] // ✅ should be plural 'styleUrls'
})
@Injectable({
  providedIn: 'root'
})
export class ContactusComponent implements OnInit {
  private baseUrl = `${environment.apiUrl}/api/Driver`;

  constructor(private http: HttpClient) { }

  driverId: string = localStorage.getItem('userId') || '';

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  isSubmitting: boolean = false;
  errorMessage: string = '';
  selectedSubject: string = 'General Inquiry';
  message: string = '';
  isLoading: boolean = false;

  subjects = [
    'General Inquiry',
    'Laundry Issues',
    'Payment Issues',
    'Other'
  ];

  ngOnInit(): void {
    this.loadDriverContactIntoForm();
  }

  onSubmit() {
    if (!this.firstName || !this.lastName || !this.email || !this.phoneNumber || !this.message) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.isSubmitting = true;

    const formData = {
      driverID: this.driverId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: Array.isArray(this.phoneNumber) ? this.phoneNumber : [this.phoneNumber],
      selectedSubject: this.selectedSubject?.trim() ? this.selectedSubject : 'General Inquiry',
      message: this.message
    };

    console.log('API REQUEST:', formData);

    const url = `${this.baseUrl}/AddMessage`;

    this.http.post<any>(url, formData)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: response => {
          this.errorMessage = '';

          // ✅ Reset the form fields to null
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.phoneNumber = "";
          this.selectedSubject = "";
          this.message = "";


          // ✅ Optionally: clear driverId if needed
          // this.driverId = null;

          console.log('Form cleared after successful submit.');
        },
        error: error => {
          console.error('Error submitting form:', error);
          this.errorMessage = 'Failed to send message. Please try again later.';
        }
      });
  }


  getDriverContactDetails(): Observable<DriverContactUs | null> {
    const url = `${this.baseUrl}/GetContactUsDetails/${this.driverId}`;
    console.log('FETCH URL:', url);

    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('API RESPONSE:', response);
        return this.mapToDriverContactUs(response);
      }),
      catchError(error => {
        console.error('API ERROR:', error);
        return of(null);
      })
    );
  }


  private mapToDriverContactUs(data: any): DriverContactUs {
    console.log('Mapping driver contact data:', data);
    return {
      driverID: data.driverID,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber
    };
  }

  loadDriverContactIntoForm() {
    this.isLoading = true;
    console.log('LOAD START');

    this.getDriverContactDetails().pipe(
      finalize(() => {
        console.log('FINALIZE → STOP LOADING');
        this.isLoading = false; // ✅
      })
    ).subscribe(contact => {
      console.log('SUBSCRIBE NEXT:', contact);
      if (contact) {
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.email = contact.email;
        this.phoneNumber = contact.phoneNumber.join(', ');
      }
    });
  }


}
