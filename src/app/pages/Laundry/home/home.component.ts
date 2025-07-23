import { Component, Input, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';




@Component({
  selector: 'app-home',
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @Input() laundryName: string = 'Laundry Name';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get the laundry name from localStorage (set during login)
    const storedName = localStorage.getItem('laundryName');
    this.laundryName = storedName ? storedName : 'Laundry Name';
  }

  goToNewOrder() {
    this.router.navigate(['/new-orders']);
  }

   goToProcessingOrder() {
    this.router.navigate(['/processing-orders']);
  }

  goToCompletedOrder() {
    this.router.navigate(['/completed-orders']);
  }

  goToRejectedItems() {
    this.router.navigate(['/processing-orders']);
  }
}
