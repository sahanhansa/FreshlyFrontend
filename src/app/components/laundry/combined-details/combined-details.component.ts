import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin } from 'rxjs';
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

interface OwnerDetails {
  ownerId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  address: string;
  contactNumber: string;
}

interface OrderCountResponse {
  laundryId: string;
  orderCount: number;
}

@Component({
  selector: 'app-combined-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combined-details.component.html'
})
export class CombinedDetailsComponent implements OnInit {
  @Input() laundryId: string = '';
  @Output() orderCountChanged = new EventEmitter<number>();
  
  laundryDetails: LaundryDetails | null = null;
  ownerDetails: OwnerDetails | null = null;
  isLoading = false;
  error: string | null = null;
  
  // Active tab state
  activeTab: 'business' | 'owner' = 'business';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.laundryId) {
      this.loadAllDetails();
    }
  }

  loadAllDetails() {
    this.isLoading = true;
    this.error = null;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const laundryUrl = `${environment.apiUrl}/api/Laundry/details/${this.laundryId}`;
    const ownerUrl = `${environment.apiUrl}/api/Owner/details/${this.laundryId}`;
    const orderCountUrl = `${environment.apiUrl}/api/Profile/order-count/${this.laundryId}`;

    // Load all details simultaneously
    forkJoin({
      laundry: this.http.get<LaundryDetails>(laundryUrl, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching laundry details:', error);
          return of(null);
        })
      ),
      owner: this.http.get<OwnerDetails>(ownerUrl, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching owner details:', error);
          return of(null);
        })
      ),
      orderCount: this.http.get<OrderCountResponse>(orderCountUrl, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching order count:', error);
          return of(null);
        })
      )
    }).subscribe({
      next: (data) => {
        this.laundryDetails = data.laundry;
        this.ownerDetails = data.owner;
        this.isLoading = false;
        
        // Emit order count to parent component
        if (data.orderCount && typeof data.orderCount.orderCount === 'number') {
          this.orderCountChanged.emit(data.orderCount.orderCount);
        }
        
        if (!data.laundry && !data.owner) {
          this.error = 'Failed to load details';
        }
      },
      error: (error) => {
        console.error('Error loading details:', error);
        this.error = 'Failed to load details';
        this.isLoading = false;
      }
    });
  }

  switchTab(tab: 'business' | 'owner') {
    this.activeTab = tab;
  }
}
