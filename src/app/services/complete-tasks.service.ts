import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CompleteTasksDetailsDto {
  orderId: string;
  customerName: string;
  status: string;
  // Add other fields as needed
}

@Injectable({ providedIn: 'root' })
export class CompleteTasksService {
  constructor() {}

  getAllCompleteTasks(): Observable<CompleteTasksDetailsDto[]> {
    // Replace with real HTTP call
    return of([
      {
        orderId: 'ORD001',
        customerName: 'John Doe',
        status: 'Completed'
      },
      {
        orderId: 'ORD002',
        customerName: 'Jane Smith',
        status: 'Completed'
      }
    ]);
  }
}
