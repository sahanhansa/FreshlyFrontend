import { Component } from '@angular/core';
import { LaundryListComponent } from '../../../components/order/laundry-list/laundry-list.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laundry-page',
  standalone: true,
  imports: [CommonModule, LaundryListComponent, FooterComponent],
  templateUrl: './laundry-list-page.component.html',
  styleUrls: ['./laundry-list-page.component.css']
})
export class LaundryPageComponent {}