import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RejectedItemService } from '../../../services/rejected-item.service';
import { OrderService } from '../../../services/order.service';
import { FooterComponent } from '@app/components/shared/footer/footer.component';

@Component({
  selector: 'app-rejected-item-details',
  templateUrl: './rejected-item-details.component.html',
  imports: [CommonModule, DatePipe, FooterComponent]
})
export class RejectedItemDetailsComponent implements OnInit {
  rejectedItem: any;
  orderDetails: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private rejectedItemService: RejectedItemService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const laundryId = this.route.snapshot.paramMap.get('laundryId');
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const statusId = this.route.snapshot.paramMap.get('statusId');
    if (laundryId && orderId && statusId) {
      this.orderService.getModifiedOrderDetailsById(laundryId, orderId, statusId).subscribe(details => {
        this.orderDetails = details;
        this.loading = false;
      }, () => { this.loading = false; });
    } else {
      this.loading = false;
    }
  }
} 