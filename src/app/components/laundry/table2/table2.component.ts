import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table2',
  standalone: true,
  imports:[CommonModule,NgFor,RouterLink],
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.css']
})
export class TableComponent {
  columns: string[] = ['Tracking ID',  'Date', ''];

  
  tableData: any[] = [
    ['T001',  '2025-03-01','' ],
    ['T002', '2025-03-02', ''],
    ['T003',  '2025-03-03', ''],
    ['T004',  '2025-03-04', ''],
    ['T005',  '2025-03-05', ''],
    ['T006',  '2025-03-06', ''],
    ['T007',  '2025-03-07', ''],
    ['T008',  '2025-03-08','' ],
    ['T009',  '2025-03-09','' ],
    ['T010',  '2025-03-10', '']
   
   
  ]  
}
