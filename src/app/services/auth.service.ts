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

 customerLogin(data:any) {
    console.log("data in service-> Customer",data)// Debug log

    
    return this.http.post(`${this.baseUrl}/Auth/customer/login`, data);
   
  }
   adminLogin(data:any) {
    console.log("data in service -> Admin",data)// Debug log
    return this.http.post(`${this.baseUrl}/Auth/admin/login`, data, {
    headers: { 'Content-Type': 'application/json' }
  });
   
  }
   laundryLogin(data:any) {
    console.log("data in service -> Laundry",data,{
    headers: { 'Content-Type': 'application/json' }
  })// Debug log

    
    return this.http.post(`${this.baseUrl}/Auth/laundry/login`, data);
   
  }
   driverLogin(data:any) {
    console.log("data in service -> Driver",data)// Debug log
    return this.http.post(`${this.baseUrl}/Auth/driver/login`, data, {
    headers: { 'Content-Type': 'application/json' }
  });
}
  //  driverLogin(data:any) {
  //   console.log("data in service",data)// Debug log

    
  //   return this.http.post(`${this.baseUrl}/Auth/driver/login`, data);
   
  // }
  signup_async(data: any) {
    console.log("data in service (signup)", data);// Debug log
     return this.http.post(`${this.baseUrl}/Customer`, data, {
    headers: { 'Content-Type': 'application/json' }
  });
    
  }
   }
  
