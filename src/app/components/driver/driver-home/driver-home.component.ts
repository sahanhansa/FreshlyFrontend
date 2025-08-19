import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

export interface DriverHome {
  AllPickups: number;
  PendingPickups: number;
  AllDelivery: number;
  PendingDelivery: number;
  FullName: string;
}

@Component({
  selector: 'app-driver-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit {

  private baseUrl = `${environment.apiUrl}/api/Driver`;
  driverId: string = localStorage.getItem('userId') || '';

  AllPickups: number = 0;
  PendingPickups: number = 0;
  AllDelivery: number = 0;
  PendingDelivery: number = 0;
  FullName: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDriverProfileIntoForm();
  }

  getDriverProfileDetails(): Observable<DriverHome | null> {
    const url = `${this.baseUrl}/DriverHomePage/${this.driverId}`;

    return this.http.get<any>(url).pipe(
      map(response => this.mapToDriverHome(response)),
      catchError(error => {
        console.error('Error fetching driver profile details:', error);
        return of(null);
      })
    );
  }

  private mapToDriverHome(data: any): DriverHome {
    return {
      AllPickups: data.allPickups,
      PendingPickups: data.pendingPickups,
      AllDelivery: data.allDelivery,
      PendingDelivery: data.pendingDelivery,
      FullName: data.fullName
    };
  }

  loadDriverProfileIntoForm() {
    this.getDriverProfileDetails().subscribe(profile => {
      if (profile) {
        this.AllPickups = profile.AllPickups;
        this.PendingPickups = profile.PendingPickups;
        this.AllDelivery = profile.AllDelivery;
        this.PendingDelivery = profile.PendingDelivery;
        this.FullName = profile.FullName;
      }
    });
  }
}
