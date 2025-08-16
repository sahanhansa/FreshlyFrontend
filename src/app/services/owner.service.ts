import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { OwnerDetails } from '@app/models/owner';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private apiUrl = `${environment.apiUrl}/api/Owner`; 

   private readonly TEST_LAUNDRY_ID = 'efaa5020-331b-11f0-a791-c138d5830fc3';

  constructor(private http: HttpClient) {
  }

    getOwnerDetails(id: string = this.TEST_LAUNDRY_ID): Observable<OwnerDetails> {
      const url = `${this.apiUrl}/get-owner-details/${id}`;
      console.log('Fetching owner details from:', url);
      
      return this.http.get<OwnerDetails>(url).pipe(
        tap(response => {
          console.log('Owner details API response:', response);
        }),
        catchError(error => {
          return throwError(() => new Error('Failed to load owner details. Please try again later.'));
        })
      );
    }
}
