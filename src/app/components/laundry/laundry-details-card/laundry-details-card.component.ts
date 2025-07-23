import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface LaundryDetails {
  laundryId: string;
  laundryName: string;
  email: string;
  address: string;
  contactNumber: string;
  logoUrl: string | null;
}

@Component({
  selector: 'app-laundry-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laundry-details-card.component.html'
})
export class LaundryDetailsCardComponent implements OnInit {
  @Input() laundryId: string = '';
  
  laundry: LaundryDetails | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.laundryId) {
      this.loadLaundryDetails();
    }
  }

  loadLaundryDetails() {
    this.isLoading = true;
    this.error = null;

    const token = localStorage.getItem('token');
    console.log('Laundry ID:', this.laundryId);
    console.log('Token:', token ? 'Present' : 'Missing');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${environment.apiUrl}/api/Laundry/details/${this.laundryId}`;
    console.log('API URL:', url);

    this.http.get<LaundryDetails>(url, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching laundry details:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error URL:', error.url);
          
          let errorMessage = 'Failed to load laundry details';
          if (error.status === 401) {
            errorMessage = 'Unauthorized - Please login again';
          } else if (error.status === 404) {
            errorMessage = 'Laundry not found';
          } else if (error.status === 0) {
            errorMessage = 'Network error - Check your connection';
          }
          
          this.error = errorMessage;
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe(data => {
        console.log('Laundry details received:', data);
        this.laundry = data;
        this.isLoading = false;
      });
  }
}
