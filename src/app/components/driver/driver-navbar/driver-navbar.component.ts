import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-navbar',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './driver-navbar.component.html',
  styleUrl: './driver-navbar.component.css'
})
export class DriverNavbarComponent {

  logourl:string="logo.png" ;


}
