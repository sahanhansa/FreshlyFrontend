import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LaundryRegistrationRequest {
  laundryName: string;
  streetNumber: string;
  street: string;
  city: string;
  postalCode: string;
  email: string;
  contactNumber1: string;
  contactNumber2?: string;
  ownerName: string;
  ownerAddress: string;
  ownerContact: string;
  ownerEmail: string;
  username: string;
  displayName: string;
  password: string;
}

export interface LaundryRegistrationResponse {
  success: boolean;
  message: string;
  data?: any;
  laundryId?: string;
  ownerId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LaundryRegistrationService {
  private apiUrl = 'http://localhost:5027/api/Auth/laundry-owner/register';

  constructor(private http: HttpClient) {}

  registerLaundry(data: LaundryRegistrationRequest): Observable<LaundryRegistrationResponse> {
    return this.http.post<LaundryRegistrationResponse>(this.apiUrl, data);
  }
}
