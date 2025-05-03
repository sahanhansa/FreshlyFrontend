import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whoareyou',
  templateUrl: './whoareyou.component.html',
  styleUrls: ['./whoareyou.component.css']
})
export class WhoAreYouComponent {

  constructor(private router: Router) {}

  goTo(role: string) {
    switch(role) {
      case 'customer':
        this.router.navigate(['/login']);
        break;
      case 'driver':
        this.router.navigate(['login']);
        break;
      case 'admin':
        this.router.navigate(['login']);
        break;
    }
  }
}

