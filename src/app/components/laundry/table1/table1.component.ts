import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table1',
  standalone: true,
  imports:[CommonModule,NgFor],
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class TableComponent {
  columns: string[] = ['Tracking ID', 'Customer', 'Date', 'Order ID', 'Payment Method', 'Action', 'Order Summary'];

  
  tableData: any[] = [
    ['T001', 'John Doe', '2025-03-01', 'O001', 'Credit Card', 'Shipped','Order Details Here'],
    ['T002', 'Jane Smith', '2025-03-02', 'O002', 'PayPal', 'Pending', 'Order Details Here'],
    ['T003', 'Sam Wilson', '2025-03-03', 'O003', 'Debit Card', 'Delivered', 'Order Details Here'],
    ['T004', 'Mike Johnson', '2025-03-04', 'O004', 'Cash on Delivery', 'Shipped', 'Order Details Here'],
    ['T005', 'Emily Davis', '2025-03-05', 'O005', 'Credit Card', 'Cancelled', 'Order Details Here'],
    ['T006', 'James Brown', '2025-03-06', 'O006', 'PayPal', 'Shipped', 'Order Details Here'],
    ['T007', 'Linda Taylor', '2025-03-07', 'O007', 'Debit Card', 'Pending', 'Order Details Here'],
    ['T008', 'Michael Wilson', '2025-03-08', 'O008', 'Credit Card', 'Delivered', 'Order Details Here'],
    ['T009', 'Sarah Clark', '2025-03-09', 'O009', 'Cash on Delivery', 'Shipped', 'Order Details Here'],
    ['T010', 'David Lewis', '2025-03-10', 'O010', 'PayPal', 'Cancelled', 'Order Details Here']
   
   
  ]  
}
