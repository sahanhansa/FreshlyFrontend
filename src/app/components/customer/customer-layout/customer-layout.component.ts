import { Component } from '@angular/core';
import { NavbarOrderComponent } from "../../order/navbar-order/navbar-order.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  standalone: true, // <-- Add this line
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css'],
  imports: [NavbarOrderComponent, FooterComponent, RouterModule]
})
export class CustomerLayoutComponent {

}
