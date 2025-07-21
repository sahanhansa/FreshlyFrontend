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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rejectedItemService.getRejectedItemById(id).subscribe(item => {
        this.rejectedItem = item;
      });
    }
  }
} 