import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login_async(data:any) {
    console.log("data in service",data)
    return this.http.post("https://localhost:7276/api/Auth/login",data)
  }
}
