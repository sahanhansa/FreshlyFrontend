import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-driver-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css'] // note styleUrls (plural)
})
export class DriverNavbarComponent {

  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        console.log("route", this.currentRoute);
      });
  }
}
