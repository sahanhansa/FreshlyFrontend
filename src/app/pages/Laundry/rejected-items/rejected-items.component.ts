import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RejectedItemService } from '../../../services/rejected-item.service';
import { RejectedItem } from '../../../models/rejected-item.model';
import { FooterComponent } from '@app/components/shared/footer/footer.component';

@Component({
  selector: 'app-rejected-items',
  imports: [CommonModule, FormsModule,RouterModule,FooterComponent],
  templateUrl: './rejected-items.component.html'
})
export class RejectedItemsComponent implements OnInit {
  rejectedItems: RejectedItem[] = [];

  constructor(private rejectedItemService: RejectedItemService) {}

  ngOnInit(): void {
    const laundryId = localStorage.getItem('laundryId');
    if (laundryId) {
      this.rejectedItemService.getRejectedItemsByLaundryId(laundryId).subscribe(items => {
      this.rejectedItems = items;
    });
    }
  }
}
