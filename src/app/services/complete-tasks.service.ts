import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompleteTasksDetailsDto {
  orderId: string;
  customerId: string;
  customerName: string;
  address: string;
  laundryName: string;
  status: string;
  contact: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CompleteTasksService {
  private apiUrl = 'http://localhost:5027/api/Order';
  driverId = localStorage.getItem('driverId');

  constructor(private http: HttpClient) {}

  getAllCompleteTasks(): Observable<CompleteTasksDetailsDto[]> {
    return this.http.get<CompleteTasksDetailsDto[]>(`${this.apiUrl}/GetAllCompleteTasks/${this.driverId}`);
   
  }
}
