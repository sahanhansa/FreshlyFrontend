import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RejectedItemService } from '../../../services/rejected-item.service';

@Component({
  selector: 'app-rejected-item-details',
  templateUrl: './rejected-item-details.component.html',
  imports: [CommonModule, DatePipe]
})
export class RejectedItemDetailsComponent implements OnInit {
  rejectedItem: any;

  constructor(private route: ActivatedRoute, private rejectedItemService: RejectedItemService) {}

  ngOnInit(): void {
    const laundryId = localStorage.getItem('laundryId');
    const rejectedItemId = this.route.snapshot.paramMap.get('id');
    if (laundryId && rejectedItemId) {
      this.rejectedItemService.getRejectedItemByLaundryAndId(laundryId, rejectedItemId).subscribe((item: any) => {
        this.rejectedItem = item;
      });
    }
  }
} 