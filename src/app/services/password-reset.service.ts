import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PasswordResetService {
  private baseUrl = environment.apiUrl; // replace with real backend

  constructor(private http: HttpClient) { }

  requestReset(email: string, userType: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Auth/request-password-reset`, {
      email,
      userType
    });
  }

  verifyReset(email: string, code: string, newPassword: string, userType: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Auth/verify-reset-code`, {
      email,
      code,
      newPassword,
      userType
    });
  }
}
