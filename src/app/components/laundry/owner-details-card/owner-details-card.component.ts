import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface OwnerDetails {
  ownerId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  address: string;
  contactNumber: string;
  profileImageUrl: string | null;
}

@Component({
  selector: 'app-owner-details-card',
  standalone: true,
  imports: [CommonModule],
 templateUrl: './owner-details-card.component.html',
})
export class OwnerDetailsCardComponent implements OnInit {
  @Input() laundryId: string = '';
  
  owner: OwnerDetails | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.laundryId) {
      this.loadOwnerDetails();
    }
  }

  loadOwnerDetails() {
    this.isLoading = true;
    this.error = null;

    const token = localStorage.getItem('token');
    console.log('Owner Details - Laundry ID:', this.laundryId);
    console.log('Owner Details - Token:', token ? 'Present' : 'Missing');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${environment.apiUrl}/api/Owner/details/${this.laundryId}`;
    console.log('Owner Details API URL:', url);

    this.http.get<OwnerDetails>(url, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching owner details:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error URL:', error.url);
          
          let errorMessage = 'Failed to load owner details';
          if (error.status === 401) {
            errorMessage = 'Unauthorized - Please login again';
          } else if (error.status === 404) {
            errorMessage = 'Owner not found';
          } else if (error.status === 0) {
            errorMessage = 'Network error - Check your connection';
          }
          
          this.error = errorMessage;
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe(data => {
        console.log('Owner details received:', data);
        this.owner = data;
        this.isLoading = false;
      });
  }
}
