import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

// Add interface for order count response
interface OrderCountResponse {
  laundryId: string;
  orderCount: number;
}

@Component({
  selector: 'app-laundry-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laundry-details-card.component.html'
})
export class LaundryDetailsCardComponent implements OnInit {
  @Input() laundryId: string = '';
  // Add Output for order count
  @Output() orderCountChanged = new EventEmitter<number>();
  
  laundry: LaundryDetails | null = null;
  isLoading = false;
  error: string | null = null;

  // Add order count state
  orderCount: number | null = null;
  orderCountError: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.laundryId) {
      this.loadLaundryDetails();
      this.loadOrderCount();
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

  // Add method to load order count
  loadOrderCount() {
    this.orderCount = null;
    this.orderCountError = null;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${environment.apiUrl}/api/Profile/order-count/${this.laundryId}`;
    this.http.get<OrderCountResponse>(url, { headers })
      .pipe(
        catchError(error => {
          let errorMessage = 'Failed to load order count';
          if (error.status === 401) {
            errorMessage = 'Unauthorized - Please login again';
          } else if (error.status === 404) {
            errorMessage = 'Order count not found';
          } else if (error.status === 0) {
            errorMessage = 'Network error - Check your connection';
          }
          this.orderCountError = errorMessage;
          return of(null);
        })
      )
      .subscribe(data => {
        if (data && typeof data.orderCount === 'number') {
          this.orderCount = data.orderCount;
          // Emit to parent
          this.orderCountChanged.emit(data.orderCount);
        }
      });
  }
}
