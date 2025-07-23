import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

export interface DriverProfile {
  name: string;
  id: string;
  licenseNumber: string;
  email: string;
  contact: string[];
  address: string;
  vehicleNo: string | null;
  location: string;
  postalCode: string;
  profilePhoto?: string; // optional if not in your JSON yet
}

@Component({
  standalone: true,
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css'],
  imports: [CommonModule, RouterLink]
})
export class DriverProfileComponent {
  private baseUrl = `${environment.apiUrl}/api/Driver`;
  driverId: string = localStorage.getItem('userId') || '';

  constructor(private http: HttpClient) {}

  name: string = '';
  id: string = '';
  licenseNumber: string = '';
  email: string = '';
  contact: string[] = [];
  contactDisplay: string = '';
  address: string = '';
  vehicleNo: string | null = '';
  location: string = '';
  postalCode: string = '';
  profilePhoto: string = '';

  isLoading: boolean = false;
  
  ngOnInit(): void {
    this.loadDriverProfileIntoForm();
  }

  getDriverProfileDetails(): Observable<DriverProfile | null> {
    const url = `${this.baseUrl}/DriverProfile/${this.driverId}`;

    return this.http.get<any>(url).pipe(
      map(response => this.mapToDriverProfile(response)),
      catchError(error => {
        console.error('Error fetching driver profile details:', error);
        return of(null);
      })
    );
  }

  private mapToDriverProfile(data: any): DriverProfile {
    return {
      id: data.driverID,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      contact: Array.isArray(data.contactNumber) ? data.contactNumber : [],
      licenseNumber: data.licenseNumber,
      address: data.homeAddress,
      vehicleNo: data.vehicleNumber,
      location: data.location,
      postalCode: data.postalCode || '',
      profilePhoto: data.profilePhoto
    };
  }

  loadDriverProfileIntoForm() {
    this.getDriverProfileDetails().subscribe(profile => {
      if (profile) {
        this.id = profile.id;
        this.name = profile.name;
        this.email = profile.email;
        this.contact = profile.contact;
        this.contactDisplay = this.contact.join(', ');
        this.licenseNumber = profile.licenseNumber;
        this.address = profile.address;
        this.vehicleNo = profile.vehicleNo;
        this.location = profile.location;
        this.postalCode = profile.postalCode || '';
        this.profilePhoto = profile.profilePhoto || '';

        console.log('Driver Profile Loaded:', { ...profile });
      } else {
        console.warn('No profile returned.');
      }
    });
  }
}
