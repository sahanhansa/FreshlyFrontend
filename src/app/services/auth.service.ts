import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';





@Injectable({
  providedIn: 'root',// Makes the service available application-wide
})
export class AuthService {
   private baseUrl = environment.apiUrl;

 // Injecting HttpClient to make HTTP requests
  constructor(private http:HttpClient) { }

  login_async(data:any) {
    console.log("data in service",data)// Debug log
    return this.http.post(`${this.baseUrl}/Auth/login`, data);
    // return this.http.post("https://localhost:7276/api/Auth/login",data)// API call to login endpoin
  }
  signup_async(data: any) {
    console.log("data in service (signup)", data);// Debug log
     return this.http.post(`${this.baseUrl}/Customer`, data);
    // return this.http.post("https://localhost:7276/api/Customer", data);// API call to signup endpoint 
  }
}
