import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service'; // ✅ Add import

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

  constructor(
    private http: HttpClient,
    private storage: StorageService // ✅ Inject StorageService
  ) {}

  getAllCompleteTasks(): Observable<CompleteTasksDetailsDto[]> {
    const driverId = this.storage.getUserId(); // ✅ Changed
    return this.http.get<CompleteTasksDetailsDto[]>(`${this.apiUrl}/GetAllCompleteTasks/${driverId}`);
  }
}
